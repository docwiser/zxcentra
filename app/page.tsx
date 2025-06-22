'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel } from '@/components/ui/carousel';
import { ArrowRight, Star, Users, Shield, Zap, Play, ChevronDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface Company {
  name: string;
  tagline: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  price: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
  deliverables: string[];
}

export default function Home() {
  const [company, setCompany] = useState<Company | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, productsRes, servicesRes] = await Promise.all([
          fetch('/api/company/data'),
          fetch('/api/products'),
          fetch('/api/services')
        ]);

        if (companyRes.ok) {
          const companyData = await companyRes.json();
          setCompany(companyData);
        }

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData);
        }

        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { label: 'Happy Clients', value: '500+', icon: Users },
    { label: 'Projects Completed', value: '1000+', icon: Star },
    { label: 'Years Experience', value: '5+', icon: Shield },
    { label: 'Team Members', value: '50+', icon: Zap },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex flex-col">
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-background dark:to-blue-950/20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse">
                <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="h-12 bg-gray-200 rounded w-32"></div>
                  <div className="h-12 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section with Video Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-background dark:to-blue-950/20">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <motion.div
            className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent"
              variants={itemVariants}
            >
              {company?.tagline || 'Innovating Tomorrow\'s Technology Today'}
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {company?.description || 'Leading provider of cutting-edge software solutions and digital transformation services for businesses worldwide.'}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Button size="lg" asChild className="group">
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="group">
                <Link href="/contact">
                  <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Get Started
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div 
                  key={index} 
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <IconComponent className="h-8 w-8 mx-auto mb-2 opacity-80" />
                  <motion.div 
                    className="text-3xl font-bold mb-1"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      {products.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our cutting-edge solutions designed to transform your business
              </p>
            </motion.div>
            
            <div className="max-w-6xl mx-auto">
              <Carousel autoPlay={true} autoPlayInterval={4000} className="h-96">
                {products.map((product) => {
                  const IconComponent = LucideIcons[product.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
                  
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="h-full group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
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
                              <Button asChild className="group">
                                <Link href={`/products/${product.id}`}>
                                  Learn More
                                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </Carousel>
            </div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" size="lg" asChild className="group">
                <Link href="/products">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Services Carousel */}
      {services.length > 0 && (
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional services to accelerate your digital transformation journey
              </p>
            </motion.div>
            
            <div className="max-w-6xl mx-auto">
              <Carousel autoPlay={true} autoPlayInterval={5000} className="h-80">
                {services.map((service) => {
                  const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
                  
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
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
                            <Button asChild className="group">
                              <Link href={`/services/${service.id}`}>
                                Learn More
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </Carousel>
            </div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" size="lg" asChild className="group">
                <Link href="/services">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-primary"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join hundreds of companies that trust us with their digital transformation journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="group">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary group" asChild>
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}