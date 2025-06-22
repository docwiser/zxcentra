'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Github, ExternalLink, FileText, Shield, Globe } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  github: Github,
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
  social_github: string;
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
    github: company.social_github,
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

          {/* Legal & Social */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4">Legal</h3>
            <nav role="navigation" aria-label="Legal links">
              <ul className="space-y-2 mb-6">
                {footerLinks.legal.map((link) => (
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

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
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
                              <IconComponent className="h-5 w-5" />
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
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="border-t mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}