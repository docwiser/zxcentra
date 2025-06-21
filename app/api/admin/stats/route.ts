import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { getAllUsers } from '@/lib/users';
import { getProducts, getServices } from '@/lib/company';

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

    const stats = {
      totalUsers: users.length,
      totalBlogs: 6, // Mock data - would come from blog storage
      totalProducts: products.length,
      totalServices: services.length,
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