export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

import db from '../database/json-db';

export class FAQModel {
  static findAll(): FAQ[] {
    const faqs = db.findMany<FAQ>('faqs', { status: 'active' });
    return faqs.sort((a, b) => a.order - b.order);
  }

  static findById(id: number): FAQ | undefined {
    return db.findById<FAQ>('faqs', id);
  }

  static create(data: Partial<FAQ>): FAQ {
    return db.create<FAQ>('faqs', {
      ...data,
      status: data.status || 'active',
      order: data.order || 0
    });
  }

  static update(id: number, updates: Partial<FAQ>): FAQ | null {
    return db.update<FAQ>('faqs', id, updates);
  }

  static delete(id: number): boolean {
    return db.delete('faqs', id);
  }

  static findAllForAdmin(): FAQ[] {
    return db.findAll<FAQ>('faqs');
  }
}