import { NextResponse } from 'next/server';
import { BlogModel } from '@/lib/models/blog';

export async function GET() {
  try {
    const posts = BlogModel.findAllPublished();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}