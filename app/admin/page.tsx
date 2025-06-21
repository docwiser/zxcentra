'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { hasPermission } from '@/lib/permissions';
import { 
  Users, 
  Settings, 
  FileText, 
  Package, 
  Briefcase, 
  Shield,
  BarChart3,
  Globe,
  LogOut
} from 'lucide-react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBlogs: 0,
    totalProducts: 0,
    totalServices: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (session && !hasPermission(session.user.permissions, 'admin:access')) {
      router.push('/profile');
      return;
    }

    // Load stats
    fetchStats();
  }, [session, status, router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || !hasPermission(session.user.permissions, 'admin:access')) {
    return null;
  }

  const adminCards = [
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      icon: Users,
      href: '/admin/users',
      count: stats.totalUsers,
      permission: 'user:read',
    },
    {
      title: 'Blog Management',
      description: 'Create, edit, and manage blog posts',
      icon: FileText,
      href: '/admin/blogs',
      count: stats.totalBlogs,
      permission: 'blog:read',
    },
    {
      title: 'Product Management',
      description: 'Manage products and catalog',
      icon: Package,
      href: '/admin/products',
      count: stats.totalProducts,
      permission: 'product:read',
    },
    {
      title: 'Service Management',
      description: 'Manage services and offerings',
      icon: Briefcase,
      href: '/admin/services',
      count: stats.totalServices,
      permission: 'service:read',
    },
    {
      title: 'Site Settings',
      description: 'Configure company info and settings',
      icon: Settings,
      href: '/admin/settings',
      count: null,
      permission: 'settings:read',
    },
    {
      title: 'Analytics',
      description: 'View site analytics and reports',
      icon: BarChart3,
      href: '/admin/analytics',
      count: null,
      permission: 'admin:access',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session.user.name}. Manage your site from here.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="default" className="flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>{session.user.role}</span>
            </Badge>
            <Button variant="outline" onClick={() => router.push('/profile')}>
              <Users className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              <Globe className="h-4 w-4 mr-2" />
              View Site
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Blog Posts</p>
                  <p className="text-2xl font-bold">{stats.totalBlogs}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Products</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Services</p>
                  <p className="text-2xl font-bold">{stats.totalServices}</p>
                </div>
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card) => {
            const IconComponent = card.icon;
            const hasAccess = hasPermission(session.user.permissions, card.permission);
            
            if (!hasAccess) return null;
            
            return (
              <Card key={card.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <IconComponent className="h-8 w-8 text-primary" />
                    {card.count !== null && (
                      <Badge variant="secondary">{card.count}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    onClick={() => router.push(card.href)}
                  >
                    Manage
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions and updates across your site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Blog post published</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Product updated</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}