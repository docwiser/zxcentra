import bcrypt from 'bcryptjs';
import { UserModel, User } from './models/user';

export function getUserByEmail(email: string): User | undefined {
  return UserModel.findByEmail(email);
}

export function getUserById(id: string): User | undefined {
  return UserModel.findById(parseInt(id));
}

export async function createUser(userData: Partial<User>): Promise<User> {
  return UserModel.create(userData);
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  return UserModel.update(parseInt(id), updates);
}

export function deleteUser(id: string): boolean {
  return UserModel.delete(parseInt(id));
}

export function getAllUsers(): User[] {
  return UserModel.findAll();
}

export const getUsers = () => UserModel.findAll();