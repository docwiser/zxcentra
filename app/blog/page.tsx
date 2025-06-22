'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author_name: string;
  category: string;
  read_time: string;
  created_at: string;
}

interface BlogCategory {
  id: number;
  name: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch('/api/blog'),
          fetch('/api/blog/categories')
        ]);

        if (postsRes.ok) {
          const postsData = await postsRes.json();
          setBlogPosts(postsData);
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Blog</h1>
        <p className="text-xl text-muted-foreground">
          Stay updated with the latest insights, trends, and innovations in technology and digital transformation.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        <Badge 
          variant="default"
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          All
        </Badge>
        {categories.map((category) => (
          <Badge 
            key={category.id} 
            variant="secondary"
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {category.name}
          </Badge>
        ))}
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4">
                  Featured
                </Badge>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {featuredPost.author_name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(featuredPost.created_at).toLocaleDateString()}
                  </div>
                  <span>{featuredPost.read_time}</span>
                </div>
                <Button asChild>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherPosts.map((post) => (
          <Card key={post.id} className="h-full hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img 
                src={post.image} 
                alt={post.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {post.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {post.read_time}
                </span>
              </div>
              <CardTitle className="text-lg line-clamp-2">
                {post.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 mt-auto">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3" />
                  {post.author_name}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/blog/${post.slug}`}>
                  Read More
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div className="text-center mt-16">
        <Card className="bg-primary text-primary-foreground p-8">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="opacity-90 mb-6">
            Subscribe to our newsletter to get the latest insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-foreground"
              aria-label="Email address for newsletter subscription"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}