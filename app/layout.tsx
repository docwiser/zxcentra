import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { RouteAnnouncer } from '@/components/ui/route-announcer';
import { AuthProvider } from '@/components/providers/auth-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ZXCentra - Innovating Tomorrow\'s Technology Today',
    template: '%s | ZXCentra',
  },
  description: 'Leading provider of cutting-edge software solutions and digital transformation services for businesses worldwide.',
  keywords: ['technology', 'software', 'digital transformation', 'cloud services', 'enterprise solutions'],
  authors: [{ name: 'ZXCentra' }],
  creator: 'ZXCentra',
  publisher: 'ZXCentra',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zxcentra.com',
    title: 'ZXCentra - Innovating Tomorrow\'s Technology Today',
    description: 'Leading provider of cutting-edge software solutions and digital transformation services for businesses worldwide.',
    siteName: 'ZXCentra',
    images: [
      {
        url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=2',
        width: 1200,
        height: 630,
        alt: 'ZXCentra logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZXCentra - Innovating Tomorrow\'s Technology Today',
    description: 'Leading provider of cutting-edge software solutions and digital transformation services for businesses worldwide.',
    images: ['https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=2'],
    creator: '@techflow_sol',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    shortcut: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    apple: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default company data for header/footer
  const defaultCompanyData = {
    name: 'ZXCentra',
    logo: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    social_github: 'https://github.com/zxcentra',
    description: 'Leading provider of cutting-edge software solutions and digital transformation services for businesses worldwide.',
    email: 'contact@zxcentra.com',
    phone: '+1 (555) 123-4567',
    address_street: '123 Innovation Drive',
    address_city: 'San Francisco',
    address_state: 'CA',
    address_zip: '94105',
    address_country: 'USA',
    social_linkedin: 'https://linkedin.com/company/zxcentra',
    social_twitter: 'https://twitter.com/techflow_sol',
    social_facebook: 'https://facebook.com/zxcentra',
    social_instagram: 'https://instagram.com/zxcentra',
    social_youtube: 'https://youtube.com/c/zxcentra',
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <AuthProvider>
              <Header companyData={defaultCompanyData} />
              <main role="main" className="flex-1">
                {children}
              </main>
              <Footer companyData={defaultCompanyData} />
              <RouteAnnouncer />
            </AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}