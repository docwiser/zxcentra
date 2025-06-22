import db from '../database/json-db';

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
    return db.findMany<Product>('products', { status: 'active' });
  }

  static findById(id: number): Product | undefined {
    return db.findById<Product>('products', id);
  }

  static create(productData: Partial<Product>): Product {
    return db.create<Product>('products', {
      ...productData,
      status: productData.status || 'active'
    });
  }

  static update(id: number, updates: Partial<Product>): Product | null {
    return db.update<Product>('products', id, updates);
  }

  static delete(id: number): boolean {
    return db.delete('products', id);
  }

  static findAllForAdmin(): Product[] {
    return db.findAll<Product>('products');
  }
}