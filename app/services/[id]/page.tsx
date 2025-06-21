import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ServiceModel } from '@/lib/models/service';
import { ArrowLeft, Check, Clock, Users, Award } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ServicePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = ServiceModel.findById(parseInt(params.id));
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.name,
    description: service.description,
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = ServiceModel.findById(parseInt(params.id));

  if (!service) {
    notFound();
  }

  const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/services" className="hover:text-primary transition-colors">
            Services
          </Link>
          <span>/</span>
          <span>{service.name}</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Service Image */}
          <div className="space-y-4">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img 
                src={service.image} 
                alt={service.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                <h1 className="text-3xl lg:text-4xl font-bold">{service.name}</h1>
              </div>
              <Badge variant="secondary" className="mb-4">
                {service.category}
              </Badge>
              <p className="text-lg text-muted-foreground">
                {service.description}
              </p>
            </div>

            <Separator />

            {/* Deliverables */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">What You Get</h3>
              <div className="grid grid-cols-1 gap-3">
                {service.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{deliverable}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Process */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Our Process</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Discovery & Planning</h4>
                    <p className="text-sm text-muted-foreground">We analyze your requirements and create a detailed project plan.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Implementation</h4>
                    <p className="text-sm text-muted-foreground">Our expert team executes the plan with regular updates and checkpoints.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Delivery & Support</h4>
                    <p className="text-sm text-muted-foreground">We deliver the solution and provide ongoing support and training.</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Button size="lg" className="w-full" asChild>
                <Link href="/contact">
                  Get Quote
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-semibold">Fast Delivery</div>
                  <div className="text-xs text-muted-foreground">2-4 weeks</div>
                </div>
                <div>
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-semibold">Expert Team</div>
                  <div className="text-xs text-muted-foreground">10+ years exp</div>
                </div>
                <div>
                  <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-semibold">Quality Assured</div>
                  <div className="text-xs text-muted-foreground">100% satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Most projects are completed within 2-4 weeks, depending on complexity. We provide detailed timelines during consultation.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Ongoing support and maintenance included. Our team provides training and documentation for seamless adoption.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guarantee</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                100% satisfaction guarantee. We work with you until you're completely satisfied with the results.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}