import db from '../database';

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
    const stmt = db.prepare('SELECT * FROM services WHERE status = ? ORDER BY created_at DESC');
    const services = stmt.all('active') as any[];
    
    return services.map(service => ({
      ...service,
      deliverables: JSON.parse(service.deliverables || '[]')
    }));
  }

  static findById(id: number): Service | undefined {
    const stmt = db.prepare('SELECT * FROM services WHERE id = ?');
    const service = stmt.get(id) as any;
    
    if (service) {
      return {
        ...service,
        deliverables: JSON.parse(service.deliverables || '[]')
      };
    }
    
    return undefined;
  }

  static create(serviceData: Partial<Service>): Service {
    const stmt = db.prepare(`
      INSERT INTO services (name, description, icon, image, deliverables, category, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      serviceData.name,
      serviceData.description,
      serviceData.icon,
      serviceData.image,
      JSON.stringify(serviceData.deliverables || []),
      serviceData.category,
      serviceData.status || 'active'
    );

    return this.findById(result.lastInsertRowid as number)!;
  }

  static update(id: number, updates: Partial<Service>): Service | null {
    const fields = [];
    const values = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (key === 'deliverables') {
        fields.push('deliverables = ?');
        values.push(JSON.stringify(value));
      } else if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const stmt = db.prepare(`UPDATE services SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);

    return this.findById(id);
  }

  static delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM services WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static findAllForAdmin(): Service[] {
    const stmt = db.prepare('SELECT * FROM services ORDER BY created_at DESC');
    const services = stmt.all() as any[];
    
    return services.map(service => ({
      ...service,
      deliverables: JSON.parse(service.deliverables || '[]')
    }));
  }
}