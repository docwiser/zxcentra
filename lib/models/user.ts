import db from '../database/json-db';
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
    return db.findOne<User>('users', { email });
  }

  static findById(id: number): User | undefined {
    return db.findById<User>('users', id);
  }

  static async create(userData: Partial<User>): Promise<User> {
    const hashedPassword = userData.password ? await bcrypt.hash(userData.password, 12) : undefined;
    
    const newUser = {
      ...userData,
      password: hashedPassword,
      role: userData.role || 'user',
      permissions: userData.permissions || ['profile:read', 'profile:write'],
      social_logins: userData.social_logins || []
    };

    return db.create<User>('users', newUser);
  }

  static update(id: number, updates: Partial<User>): User | null {
    return db.update<User>('users', id, updates);
  }

  static delete(id: number): boolean {
    return db.delete('users', id);
  }

  static findAll(): User[] {
    return db.findAll<User>('users');
  }
}