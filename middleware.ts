import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
    const isProfilePage = req.nextUrl.pathname.startsWith('/profile');

    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/profile', req.url));
    }

    // Redirect unauthenticated users to sign in
    if ((isAdminPage || isProfilePage) && !isAuth) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // Check admin access for admin pages
    if (isAdminPage && isAuth) {
      const userPermissions = token.permissions as string[];
      const hasAdminAccess = userPermissions.includes('*') || userPermissions.includes('admin:access');
      
      if (!hasAdminAccess) {
        return NextResponse.redirect(new URL('/profile', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Let the middleware function handle authorization
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/auth/:path*']
};