'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Menu, Github, Calendar, MapPin, X, User, Settings, LogOut, Shield } from 'lucide-react';

interface CompanyData {
  name: string;
  logo: string;
  social_github: string;
  navigation?: Array<{ name: string; href: string }>;
  [key: string]: any;
}

interface HeaderProps {
  companyData: CompanyData;
}

export function Header({ companyData }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  
  // Use company data passed as prop
  const company = companyData;

  const navigation = company.navigation || [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isAdmin = session?.user?.role === 'admin';

  return (
    <header role="banner" className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* CTAs moved to left */}
        <div className="hidden lg:flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link 
              href={company.social_github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our GitHub repository"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link 
              href="/contact"
              aria-label="Book an appointment with us"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Appointment
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link 
              href="/about"
              aria-label="Discover our presence and locations"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Our Presence
            </Link>
          </Button>
        </div>

        {/* Logo and Company Name - Centered */}
        <div className="flex items-center space-x-3">
          <Link 
            href="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            aria-label={`${company.name} - Go to homepage`}
          >
            <img 
              src={company.logo} 
              alt={`${company.name} logo`}
              className="h-8 w-8 rounded-md object-cover"
              width={32}
              height={32}
            />
            <span className="font-bold text-lg text-primary">{company.name}</span>
          </Link>
        </div>

        {/* Navigation and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden sm:flex relative">
            {isSearchOpen ? (
              <div className="flex items-center space-x-2">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64"
                  aria-label="Search our website"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* User Menu */}
          {status === 'loading' ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.avatar} alt={session.user.name} />
                    <AvatarFallback>
                      {session.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{session.user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                aria-label="Open mobile menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {/* Mobile Search */}
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10"
                    aria-label="Search our website"
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>

                {/* Mobile Navigation */}
                <nav role="navigation" aria-label="Mobile navigation" className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTAs */}
                <div className="flex flex-col space-y-3 pt-4 border-t">
                  <Button variant="ghost" asChild>
                    <Link 
                      href={company.social_github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link 
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link 
                      href="/about"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Our Presence
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}