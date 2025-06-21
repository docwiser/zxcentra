import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { RouteAnnouncer } from '@/components/ui/route-announcer';
import { AuthProvider } from '@/components/providers/auth-provider';
import { getCompanyData } from '@/lib/company';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyData();
  
  return {
    title: {
      default: `${company.name} - ${company.tagline}`,
      template: `%s | ${company.name}`,
    },
    description: company.description,
    keywords: ['technology', 'software', 'digital transformation', 'cloud services', 'enterprise solutions'],
    authors: [{ name: company.name }],
    creator: company.name,
    publisher: company.name,
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
      url: company.website,
      title: `${company.name} - ${company.tagline}`,
      description: company.description,
      siteName: company.name,
      images: [
        {
          url: company.logo,
          width: 1200,
          height: 630,
          alt: `${company.name} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${company.name} - ${company.tagline}`,
      description: company.description,
      images: [company.logo],
      creator: '@techflow_sol',
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    icons: {
      icon: company.logo,
      shortcut: company.logo,
      apple: company.logo,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch company settings from the database
  const companyData = await getCompanyData();

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <Header companyData={companyData} />
          <main role="main" className="flex-1">
            {children}
          </main>
          <Footer companyData={companyData} />
          <RouteAnnouncer />
        </AuthProvider>
      </body>
    </html>
  );
}