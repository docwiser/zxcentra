export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

import db from '../database/json-db';

export class TestimonialModel {
  static findAll(): Testimonial[] {
    return db.findMany<Testimonial>('testimonials', { status: 'active' });
  }

  static findById(id: number): Testimonial | undefined {
    return db.findById<Testimonial>('testimonials', id);
  }

  static create(data: Partial<Testimonial>): Testimonial {
    return db.create<Testimonial>('testimonials', {
      ...data,
      status: data.status || 'active'
    });
  }

  static update(id: number, updates: Partial<Testimonial>): Testimonial | null {
    return db.update<Testimonial>('testimonials', id, updates);
  }

  static delete(id: number): boolean {
    return db.delete('testimonials', id);
  }

  static findAllForAdmin(): Testimonial[] {
    return db.findAll<Testimonial>('testimonials');
  }
}