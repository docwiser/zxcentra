'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, ExternalLink, FileText, Shield, Globe, Send } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
};

interface CompanyData {
  name: string;
  description: string;
  logo: string;
  email: string;
  phone: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  address_country: string;
  social_linkedin: string;
  social_twitter: string;
  social_facebook: string;
  social_instagram: string;
  social_youtube: string;
  footerLinks?: {
    company: Array<{ name: string; href: string }>;
    resources: Array<{ name: string; href: string }>;
    legal: Array<{ name: string; href: string }>;
  };
  [key: string]: any;
}

interface FooterProps {
  companyData: CompanyData;
}

export function Footer({ companyData }: FooterProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const company = companyData;

  const footerLinks = company.footerLinks || {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Our Values', href: '/values' },
      { name: 'Contact Support', href: '/support' }
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Security Center', href: '/security' },
      { name: 'API Reference', href: '/api-docs' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Use', href: '/terms' },
      { name: 'Vulnerability Disclosure', href: '/vulnerability' },
      { name: 'Refund Policy', href: '/refund' }
    ]
  };

  const socialLinks = {
    facebook: company.social_facebook,
    instagram: company.social_instagram,
    twitter: company.social_twitter,
    youtube: company.social_youtube,
    linkedin: company.social_linkedin,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.name,
          email: formData.email,
          message: formData.message,
          type: 'footer'
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIconForLink = (linkName: string) => {
    if (linkName.toLowerCase().includes('documentation') || linkName.toLowerCase().includes('blog')) {
      return <FileText className="h-4 w-4 mr-2" />;
    }
    if (linkName.toLowerCase().includes('security') || linkName.toLowerCase().includes('privacy')) {
      return <Shield className="h-4 w-4 mr-2" />;
    }
    if (linkName.toLowerCase().includes('api')) {
      return <Globe className="h-4 w-4 mr-2" />;
    }
    return <ExternalLink className="h-4 w-4 mr-2" />;
  };

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

  return (
    <footer role="contentinfo" className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src={company.logo} 
                alt={`${company.name} logo`}
                className="h-8 w-8 rounded-md object-cover"
                width={32}
                height={32}
              />
              <span className="font-bold text-lg">{company.name}</span>
            </motion.div>
            <p className="text-sm text-muted-foreground">
              {company.description}
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{company.address_street}</p>
              <p>{company.address_city}, {company.address_state} {company.address_zip}</p>
              <p className="mt-2">
                <Link 
                  href={`mailto:${company.email}`}
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded inline-flex items-center"
                  aria-label={`Send email to ${company.email}`}
                >
                  {company.email}
                </Link>
              </p>
              <p>
                <Link 
                  href={`tel:${company.phone}`}
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label={`Call ${company.phone}`}
                >
                  {company.phone}
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4">Company</h3>
            <nav role="navigation" aria-label="Company links">
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded inline-flex items-center group"
                    >
                      {getIconForLink(link.name)}
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4">Resources</h3>
            <nav role="navigation" aria-label="Resource links">
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded inline-flex items-center group"
                    >
                      {getIconForLink(link.name)}
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Quick Contact Form */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4">Drop Us a Line</h3>
            {submitted ? (
              <div className="text-center py-4">
                <div className="text-primary text-2xl mb-2">✓</div>
                <p className="text-sm text-muted-foreground">Message sent successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  disabled={isSubmitting}
                  className="text-sm"
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  disabled={isSubmitting}
                  className="text-sm"
                />
                <Textarea
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  required
                  disabled={isSubmitting}
                  rows={3}
                  className="text-sm resize-none"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  <Send className="h-3 w-3 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t mt-8 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-xs text-muted-foreground">Follow us:</span>
              <TooltipProvider>
                <div className="flex space-x-3">
                  {Object.entries(socialLinks).map(([platform, url]) => {
                    const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                    if (!IconComponent || !url) return null;
                    
                    return (
                      <Tooltip key={platform}>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Link
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-1"
                              aria-label={`Follow us on ${platform}`}
                            >
                              <IconComponent className="h-4 w-4" />
                            </Link>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Follow us on {platform.charAt(0).toUpperCase() + platform.slice(1)}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}