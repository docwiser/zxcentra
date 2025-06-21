import { CompanyModel } from '@/lib/models/company';
import { ProductModel } from '@/lib/models/product';
import { ServiceModel } from '@/lib/models/service';

export interface Company {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  website: string;
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
  founded: string;
  navigation?: any[];
  footerLinks?: any;
  products?: any[];
  services?: any[];
}

export async function getCompanyData(): Promise<Company> {
  const companySettings = CompanyModel.getSettings();
  const products = ProductModel.findAll();
  const services = ServiceModel.findAll();

  // Hardcoded navigation and footer links (not in database schema)
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const footerLinks = {
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

  // Default company data if not in database
  const defaultCompany = {
    name: 'ZXCentra',
    tagline: 'Innovating Tomorrow\'s Technology Today',
    description: 'Leading provider of cutting-edge software solutions and digital transformation services for businesses worldwide.',
    logo: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    website: 'https://zxcentra.com',
    email: 'contact@zxcentra.com',
    phone: '+1 (555) 123-4567',
    address_street: '123 Innovation Drive',
    address_city: 'San Francisco',
    address_state: 'CA',
    address_zip: '94105',
    address_country: 'USA',
    social_github: 'https://github.com/zxcentra',
    social_linkedin: 'https://linkedin.com/company/zxcentra',
    social_twitter: 'https://twitter.com/techflow_sol',
    social_facebook: 'https://facebook.com/zxcentra',
    social_instagram: 'https://instagram.com/zxcentra',
    social_youtube: 'https://youtube.com/c/zxcentra',
    founded: '2025'
  };

  const company = companySettings || defaultCompany;

  return {
    ...company,
    navigation,
    footerLinks,
    products,
    services
  };
}

export async function getNavigationItems() {
  return [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];
}

export async function getProducts() {
  return ProductModel.findAll();
}

export async function getServices() {
  return ServiceModel.findAll();
}

export async function getSocialLinks() {
  const company = CompanyModel.getSettings();
  if (company) {
    return {
      github: company.social_github,
      linkedin: company.social_linkedin,
      twitter: company.social_twitter,
      facebook: company.social_facebook,
      instagram: company.social_instagram,
      youtube: company.social_youtube,
    };
  }
  
  return {
    github: 'https://github.com/zxcentra',
    linkedin: 'https://linkedin.com/company/zxcentra',
    twitter: 'https://twitter.com/techflow_sol',
    facebook: 'https://facebook.com/zxcentra',
    instagram: 'https://instagram.com/zxcentra',
    youtube: 'https://youtube.com/c/zxcentra',
  };
}

export async function getFooterLinks() {
  return {
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
}