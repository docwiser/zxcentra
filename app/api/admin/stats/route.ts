import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { getAllUsers } from '@/lib/users';
import { getProducts, getServices } from '@/lib/company';
import db from '@/lib/database/json-db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || !hasPermission(session.user.permissions, 'admin:access')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const users = getAllUsers();
    const products = await getProducts();
    const services = await getServices();
    const blogs = db.findAll('blog_posts');
    const faqs = db.findAll('faqs');
    const testimonials = db.findAll('testimonials');
    const contactSubmissions = db.findAll('contact_submissions');

    const stats = {
      totalUsers: users.length,
      totalBlogs: blogs.length,
      totalProducts: products.length,
      totalServices: services.length,
      totalFaqs: faqs.length,
      totalTestimonials: testimonials.length,
      totalContactSubmissions: contactSubmissions.length,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}