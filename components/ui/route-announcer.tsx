'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function RouteAnnouncer() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // Map pathnames to user-friendly announcements
    const getPageTitle = (path: string) => {
      switch (path) {
        case '/':
          return 'Home page';
        case '/products':
          return 'Products page';
        case '/services':
          return 'Services page';
        case '/blog':
          return 'Blog page';
        case '/about':
          return 'About page';
        case '/contact':
          return 'Contact page';
        case '/admin':
          return 'Admin panel';
        default:
          return `${path.slice(1).replace(/\//g, ' ')} page`;
      }
    };

    const pageTitle = getPageTitle(pathname);
    setAnnouncement(`Navigated to ${pageTitle}`);
  }, [pathname]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcement}
    </div>
  );
}