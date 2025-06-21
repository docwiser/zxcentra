import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceModel } from '@/lib/models/service';
import * as LucideIcons from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Professional technology services to accelerate your digital transformation journey.',
};

export default function ServicesPage() {
  const services = ServiceModel.findAll();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Services</h1>
        <p className="text-xl text-muted-foreground">
          Professional technology services designed to accelerate your digital transformation journey and drive business growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
          
          return (
            <Card key={service.id} className="h-full hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1">
                  <h4 className="font-semibold mb-3">What You Get:</h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((deliverable, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t flex space-x-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href={`/services/${service.id}`}>
                      Learn More
                    </Link>
                  </Button>
                  <Button size="sm" asChild className="flex-1">
                    <Link href="/contact">
                      Get Quote
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-16">
        <div className="bg-primary text-primary-foreground rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="opacity-90 mb-6">
            Schedule a consultation with our experts to discuss your project requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" asChild>
              <Link href="/contact">
                Schedule Consultation
              </Link>
            </Button>
            <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/about">
                Learn About Our Process
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}