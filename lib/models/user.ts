import db from '../database';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  email: string;
  name: string;
  password?: string;
  role: 'admin' | 'editor' | 'user';
  permissions: string[];
  social_logins: string[];
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export class UserModel {
  static findByEmail(email: string): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email) as any;
    
    if (user) {
      return {
        ...user,
        permissions: JSON.parse(user.permissions || '[]'),
        social_logins: JSON.parse(user.social_logins || '[]')
      };
    }
    
    return undefined;
  }

  static findById(id: number): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(id) as any;
    
    if (user) {
      return {
        ...user,
        permissions: JSON.parse(user.permissions || '[]'),
        social_logins: JSON.parse(user.social_logins || '[]')
      };
    }
    
    return undefined;
  }

  static async create(userData: Partial<User>): Promise<User> {
    const hashedPassword = userData.password ? await bcrypt.hash(userData.password, 12) : null;
    
    const stmt = db.prepare(`
      INSERT INTO users (email, name, password, role, permissions, social_logins, avatar)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      userData.email,
      userData.name,
      hashedPassword,
      userData.role || 'user',
      JSON.stringify(userData.permissions || ['profile:read', 'profile:write']),
      JSON.stringify(userData.social_logins || []),
      userData.avatar
    );

    return this.findById(result.lastInsertRowid as number)!;
  }

  static update(id: number, updates: Partial<User>): User | null {
    const fields = [];
    const values = [];

    if (updates.name) {
      fields.push('name = ?');
      values.push(updates.name);
    }
    if (updates.email) {
      fields.push('email = ?');
      values.push(updates.email);
    }
    if (updates.password) {
      fields.push('password = ?');
      values.push(updates.password);
    }
    if (updates.role) {
      fields.push('role = ?');
      values.push(updates.role);
    }
    if (updates.permissions) {
      fields.push('permissions = ?');
      values.push(JSON.stringify(updates.permissions));
    }
    if (updates.avatar) {
      fields.push('avatar = ?');
      values.push(updates.avatar);
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const stmt = db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);

    return this.findById(id);
  }

  static delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static findAll(): User[] {
    const stmt = db.prepare('SELECT * FROM users ORDER BY created_at DESC');
    const users = stmt.all() as any[];
    
    return users.map(user => ({
      ...user,
      permissions: JSON.parse(user.permissions || '[]'),
      social_logins: JSON.parse(user.social_logins || '[]')
    }));
  }
}