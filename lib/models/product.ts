import db from '../database';

export interface Product {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  price: string;
  category: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export class ProductModel {
  static findAll(): Product[] {
    const stmt = db.prepare('SELECT * FROM products WHERE status = ? ORDER BY created_at DESC');
    const products = stmt.all('active') as any[];
    
    return products.map(product => ({
      ...product,
      features: JSON.parse(product.features || '[]')
    }));
  }

  static findById(id: number): Product | undefined {
    const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const product = stmt.get(id) as any;
    
    if (product) {
      return {
        ...product,
        features: JSON.parse(product.features || '[]')
      };
    }
    
    return undefined;
  }

  static create(productData: Partial<Product>): Product {
    const stmt = db.prepare(`
      INSERT INTO products (name, description, icon, image, features, price, category, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      productData.name,
      productData.description,
      productData.icon,
      productData.image,
      JSON.stringify(productData.features || []),
      productData.price,
      productData.category,
      productData.status || 'active'
    );

    return this.findById(result.lastInsertRowid as number)!;
  }

  static update(id: number, updates: Partial<Product>): Product | null {
    const fields = [];
    const values = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (key === 'features') {
        fields.push('features = ?');
        values.push(JSON.stringify(value));
      } else if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const stmt = db.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);

    return this.findById(id);
  }

  static delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static findAllForAdmin(): Product[] {
    const stmt = db.prepare('SELECT * FROM products ORDER BY created_at DESC');
    const products = stmt.all() as any[];
    
    return products.map(product => ({
      ...product,
      features: JSON.parse(product.features || '[]')
    }));
  }
}