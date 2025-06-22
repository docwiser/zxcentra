import db from '../database';

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
    const stmt = db.prepare(`
      SELECT bp.*, u.name as author_name 
      FROM blog_posts bp 
      LEFT JOIN users u ON bp.author_id = u.id 
      WHERE bp.status = 'published' 
      ORDER BY bp.created_at DESC
    `);
    const posts = stmt.all() as any[];
    
    return posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]')
    }));
  }

  static findBySlug(slug: string): BlogPost | undefined {
    const stmt = db.prepare(`
      SELECT bp.*, u.name as author_name 
      FROM blog_posts bp 
      LEFT JOIN users u ON bp.author_id = u.id 
      WHERE bp.slug = ? AND bp.status = 'published'
    `);
    const post = stmt.get(slug) as any;
    
    if (post) {
      return {
        ...post,
        tags: JSON.parse(post.tags || '[]')
      };
    }
    
    return undefined;
  }

  static findById(id: number): BlogPost | undefined {
    const stmt = db.prepare(`
      SELECT bp.*, u.name as author_name 
      FROM blog_posts bp 
      LEFT JOIN users u ON bp.author_id = u.id 
      WHERE bp.id = ?
    `);
    const post = stmt.get(id) as any;
    
    if (post) {
      return {
        ...post,
        tags: JSON.parse(post.tags || '[]')
      };
    }
    
    return undefined;
  }

  static findByCategory(category: string): BlogPost[] {
    const stmt = db.prepare(`
      SELECT bp.*, u.name as author_name 
      FROM blog_posts bp 
      LEFT JOIN users u ON bp.author_id = u.id 
      WHERE bp.category = ? AND bp.status = 'published' 
      ORDER BY bp.created_at DESC
    `);
    const posts = stmt.all(category) as any[];
    
    return posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]')
    }));
  }

  static findCategories(): BlogCategory[] {
    const stmt = db.prepare('SELECT * FROM blog_categories ORDER BY name');
    return stmt.all() as BlogCategory[];
  }
}