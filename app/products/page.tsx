import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductModel } from '@/lib/models/product';
import * as LucideIcons from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore our comprehensive suite of technology products designed to accelerate your business growth.',
};

export default function ProductsPage() {
  const products = ProductModel.findAll();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Products</h1>
        <p className="text-xl text-muted-foreground">
          Discover our comprehensive suite of technology products designed to accelerate your business growth and digital transformation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const IconComponent = LucideIcons[product.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
          
          return (
            <Card key={product.id} className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1">
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/products/${product.id}`}>
                        Details
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/contact">
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-16">
        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-muted-foreground mb-6">
            We can tailor our products to meet your specific business requirements.
          </p>
          <Button asChild>
            <Link href="/contact">
              Contact Our Team
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}