import { NextResponse } from 'next/server';
import { BlogModel } from '@/lib/models/blog';

export async function GET() {
  try {
    const categories = BlogModel.findCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog categories' },
      { status: 500 }
    );
  }
}