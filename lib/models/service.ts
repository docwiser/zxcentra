import db from '../database/json-db';

export interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
  deliverables: string[];
  category: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export class ServiceModel {
  static findAll(): Service[] {
    return db.findMany<Service>('services', { status: 'active' });
  }

  static findById(id: number): Service | undefined {
    return db.findById<Service>('services', id);
  }

  static create(serviceData: Partial<Service>): Service {
    return db.create<Service>('services', {
      ...serviceData,
      status: serviceData.status || 'active'
    });
  }

  static update(id: number, updates: Partial<Service>): Service | null {
    return db.update<Service>('services', id, updates);
  }

  static delete(id: number): boolean {
    return db.delete('services', id);
  }

  static findAllForAdmin(): Service[] {
    return db.findAll<Service>('services');
  }
}