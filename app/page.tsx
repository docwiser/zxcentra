import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel } from '@/components/ui/carousel';
import { CompanyModel } from '@/lib/models/company';
import { ProductModel } from '@/lib/models/product';
import { ServiceModel } from '@/lib/models/service';
import { ArrowRight, Star, Users, Shield, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export default async function Home() {
  const company = CompanyModel.getSettings() || {
    name: 'ZXCentra',
    tagline: 'Innovating Tomorrow\'s Technology Today',
    description: 'Leading provider of cutting-edge software solutions and digital transformation services for businesses worldwide.'
  };
  
  const products = ProductModel.findAll();
  const services = ServiceModel.findAll();

  const stats = [
    { label: 'Happy Clients', value: '500+', icon: Users },
    { label: 'Projects Completed', value: '1000+', icon: Star },
    { label: 'Years Experience', value: '5+', icon: Shield },
    { label: 'Team Members', value: '50+', icon: Zap },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-background dark:to-blue-950/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              {company.tagline}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {company.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <IconComponent className="h-8 w-8 mx-auto mb-2 opacity-80" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our cutting-edge solutions designed to transform your business
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Carousel autoPlay={true} autoPlayInterval={4000} className="h-96">
              {products.map((product) => {
                const IconComponent = LucideIcons[product.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
                
                return (
                  <Card key={product.id} className="h-full group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                      <div className="aspect-video lg:aspect-auto relative overflow-hidden rounded-l-lg">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center space-x-3 mb-4">
                          {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                          <h3 className="text-2xl font-bold">{product.name}</h3>
                        </div>
                        <p className="text-muted-foreground mb-6 text-lg">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold text-primary">{product.price}</span>
                          <Button asChild>
                            <Link href={`/products/${product.id}`}>
                              Learn More
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </Carousel>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional services to accelerate your digital transformation journey
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Carousel autoPlay={true} autoPlayInterval={5000} className="h-80">
              {services.map((service) => {
                const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
                
                return (
                  <Card key={service.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                      <div className="aspect-video lg:aspect-auto relative overflow-hidden rounded-l-lg">
                        <img 
                          src={service.image} 
                          alt={service.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center space-x-3 mb-4">
                          {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                          <h3 className="text-2xl font-bold">{service.name}</h3>
                        </div>
                        <p className="text-muted-foreground mb-6 text-lg">
                          {service.description}
                        </p>
                        <div className="space-y-2 mb-6">
                          <h4 className="font-semibold">Deliverables:</h4>
                          <ul className="space-y-1">
                            {service.deliverables.slice(0, 3).map((deliverable, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button asChild>
                          <Link href={`/services/${service.id}`}>
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </Carousel>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join hundreds of companies that trust us with their digital transformation journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/about">
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}