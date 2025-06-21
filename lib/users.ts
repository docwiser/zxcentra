import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'editor' | 'user';
  permissions: string[];
  socialLogins: string[];
  createdAt: string;
  updatedAt: string;
}

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize with default admin user
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'admin@administrator.serve',
    name: 'Administrator',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9u2', // Admin@1122
    role: 'admin',
    permissions: ['*'], // All permissions
    socialLogins: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

function getUsers(): User[] {
  try {
    if (!fs.existsSync(usersFilePath)) {
      fs.writeFileSync(usersFilePath, JSON.stringify(defaultUsers, null, 2));
      return defaultUsers;
    }
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return defaultUsers;
  }
}

function saveUsers(users: User[]): void {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users file:', error);
  }
}

export function getUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find(user => user.email === email);
}

export function getUserById(id: string): User | undefined {
  const users = getUsers();
  return users.find(user => user.id === id);
}

export async function createUser(userData: Partial<User>): Promise<User> {
  const users = getUsers();
  const hashedPassword = userData.password ? await bcrypt.hash(userData.password, 12) : '';
  
  const newUser: User = {
    id: (users.length + 1).toString(),
    email: userData.email!,
    name: userData.name || '',
    password: hashedPassword,
    role: userData.role || 'user',
    permissions: userData.permissions || ['profile:read', 'profile:write'],
    socialLogins: userData.socialLogins || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) return null;

  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveUsers(users);
  return users[userIndex];
}

export function deleteUser(id: string): boolean {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  
  if (filteredUsers.length === users.length) return false;
  
  saveUsers(filteredUsers);
  return true;
}

export function getAllUsers(): User[] {
  return getUsers();
}

export { getUsers };