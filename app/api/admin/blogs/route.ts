import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { BlogModel } from '@/lib/models/blog';
import db from '@/lib/database/json-db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || !hasPermission(session.user.permissions, 'blog:read')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const blogs = db.findAll('blog_posts');
    const users = db.findAll('users');
    
    const blogsWithAuthors = blogs.map(blog => ({
      ...blog,
      author_name: users.find((u: any) => u.id === blog.author_id)?.name || 'Unknown'
    }));
    
    return NextResponse.json(blogsWithAuthors);
  } catch (error) {
    console.error('Blogs fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || !hasPermission(session.user.permissions, 'blog:write')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const blog = db.create('blog_posts', data);
    
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}