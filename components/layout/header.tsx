'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faCalendar, faMapMarkerAlt, faTimes, faUser, faCog, faSignOutAlt, faShield, faFileText, faBox, faBriefcase, faQuestionCircle, faComments, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface CompanyData {
  name: string;
  logo: string;
  navigation?: Array<{ name: string; href: string }>;
  [key: string]: any;
}

interface HeaderProps {
  companyData: CompanyData;
}

export function Header({ companyData }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  
  const company = companyData;

  const navigation = company.navigation || [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isAdmin = session?.user?.role === 'admin';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: -100 },
    animate: { y: 0 },
    exit: { y: -100 }
  };

  return (
    <motion.header 
      initial="initial"
      animate="animate"
      variants={headerVariants}
      transition={{ duration: 0.3 }}
      role="banner" 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-background/60' 
          : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left Section - CTAs */}
        <div className="hidden lg:flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link 
              href="/contact"
              aria-label="Book an appointment with us"
              className="group"
            >
              <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Book Appointment
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link 
              href="/about"
              aria-label="Discover our presence and locations"
              className="group"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Our Presence
            </Link>
          </Button>
        </div>

        {/* Center - Logo and Company Name */}
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link 
            href="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            aria-label={`${company.name} - Go to homepage`}
          >
            <motion.img 
              src={company.logo} 
              alt={`${company.name} logo`}
              className="h-8 w-8 rounded-md object-cover"
              width={32}
              height={32}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <span className="font-bold text-lg text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {company.name}
            </span>
          </Link>
        </motion.div>

        {/* Right Section - Navigation and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center space-x-6">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Search */}
          <div className="hidden sm:flex relative">
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-64"
                    aria-label="Search our website"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                    aria-label="Close search"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="Open search"
                    className="hover:scale-110 transition-transform"
                  >
                    <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          {status === 'loading' ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.avatar || "https://gravatar.com/c121"} alt={session.user.name} />
                    <AvatarFallback>
                      {session.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{session.user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <FontAwesomeIcon icon={faUser} className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <FontAwesomeIcon icon={faShield} className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/blogs" className="cursor-pointer">
                        <FontAwesomeIcon icon={faFileText} className="mr-2 h-4 w-4" />
                        Manage Blogs
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/products" className="cursor-pointer">
                        <FontAwesomeIcon icon={faBox} className="mr-2 h-4 w-4" />
                        Manage Products
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/services" className="cursor-pointer">
                        <FontAwesomeIcon icon={faBriefcase} className="mr-2 h-4 w-4" />
                        Manage Services
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/faqs" className="cursor-pointer">
                        <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 h-4 w-4" />
                        Manage FAQs
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/testimonials" className="cursor-pointer">
                        <FontAwesomeIcon icon={faComments} className="mr-2 h-4 w-4" />
                        Manage Testimonials
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/contact-submissions" className="cursor-pointer">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2 h-4 w-4" />
                        Contact Submissions
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                aria-label="Open mobile menu"
              >
                <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {/* Mobile Search */}
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10"
                    aria-label="Search our website"
                  />
                  <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>

                {/* Mobile Navigation */}
                <nav role="navigation" aria-label="Mobile navigation" className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTAs */}
                <div className="flex flex-col space-y-3 pt-4 border-t">
                  <Button variant="outline" asChild>
                    <Link 
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link 
                      href="/about"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-4 mr-2" />
                      Our Presence
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}