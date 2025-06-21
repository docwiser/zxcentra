import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProductModel } from '@/lib/models/product';
import { ArrowLeft, Check, Star } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = ProductModel.findById(parseInt(params.id));
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = ProductModel.findById(parseInt(params.id));

  if (!product) {
    notFound();
  }

  const IconComponent = LucideIcons[product.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img 
                src={product.image} 
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
              </div>
              <Badge variant="secondary" className="mb-4">
                {product.category}
              </Badge>
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Pricing</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-primary">{product.price}</span>
                <span className="text-muted-foreground">per month</span>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Features</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Button size="lg" className="w-full" asChild>
                <Link href="/contact">
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href="/contact">
                  Request Demo
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.9/5 rating</span>
                </div>
                <span>•</span>
                <span>500+ customers</span>
                <span>•</span>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Quick setup with our expert team. Get up and running in just a few days with comprehensive onboarding and training.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                24/7 technical support with dedicated account management. Our team is always ready to help you succeed.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Enterprise-grade security with SOC 2 compliance, encryption at rest and in transit, and regular security audits.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}