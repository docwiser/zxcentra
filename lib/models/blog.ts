import db from '../database/json-db';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author_id: number;
  author_name?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  read_time: string;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

export class BlogModel {
  static findAllPublished(): BlogPost[] {
    const posts = db.findMany<BlogPost>('blog_posts', { status: 'published' });
    const users = db.findAll('users');
    
    return posts.map(post => ({
      ...post,
      author_name: users.find((u: any) => u.id === post.author_id)?.name || 'Unknown'
    }));
  }

  static findBySlug(slug: string): BlogPost | undefined {
    const post = db.findOne<BlogPost>('blog_posts', { slug, status: 'published' });
    if (!post) return undefined;
    
    const users = db.findAll('users');
    const author = users.find((u: any) => u.id === post.author_id);
    
    return {
      ...post,
      author_name: author?.name || 'Unknown'
    };
  }

  static findById(id: number): BlogPost | undefined {
    const post = db.findById<BlogPost>('blog_posts', id);
    if (!post) return undefined;
    
    const users = db.findAll('users');
    const author = users.find((u: any) => u.id === post.author_id);
    
    return {
      ...post,
      author_name: author?.name || 'Unknown'
    };
  }

  static findByCategory(category: string): BlogPost[] {
    const posts = db.findMany<BlogPost>('blog_posts', { category, status: 'published' });
    const users = db.findAll('users');
    
    return posts.map(post => ({
      ...post,
      author_name: users.find((u: any) => u.id === post.author_id)?.name || 'Unknown'
    }));
  }

  static findCategories(): BlogCategory[] {
    return db.findAll<BlogCategory>('blog_categories');
  }
}