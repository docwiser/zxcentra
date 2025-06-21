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

  static create(postData: Partial<BlogPost>): BlogPost {
    const stmt = db.prepare(`
      INSERT INTO blog_posts (title, slug, excerpt, content, image, author_id, category, tags, status, read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      postData.title,
      postData.slug,
      postData.excerpt,
      postData.content,
      postData.image,
      postData.author_id,
      postData.category,
      JSON.stringify(postData.tags || []),
      postData.status || 'draft',
      postData.read_time
    );

    return this.findById(result.lastInsertRowid as number)!;
  }

  static update(id: number, updates: Partial<BlogPost>): BlogPost | null {
    const fields = [];
    const values = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (key === 'tags') {
        fields.push('tags = ?');
        values.push(JSON.stringify(value));
      } else if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const stmt = db.prepare(`UPDATE blog_posts SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);

    return this.findById(id);
  }

  static delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM blog_posts WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static findAllForAdmin(): BlogPost[] {
    const stmt = db.prepare(`
      SELECT bp.*, u.name as author_name 
      FROM blog_posts bp 
      LEFT JOIN users u ON bp.author_id = u.id 
      ORDER BY bp.created_at DESC
    `);
    const posts = stmt.all() as any[];
    
    return posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]')
    }));
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

  static createCategory(categoryData: Partial<BlogCategory>): BlogCategory {
    const stmt = db.prepare(`
      INSERT INTO blog_categories (name, slug, description)
      VALUES (?, ?, ?)
    `);
    
    const result = stmt.run(
      categoryData.name,
      categoryData.slug,
      categoryData.description
    );

    const findStmt = db.prepare('SELECT * FROM blog_categories WHERE id = ?');
    return findStmt.get(result.lastInsertRowid) as BlogCategory;
  }
}