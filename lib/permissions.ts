export const PERMISSIONS = {
  // User permissions
  'profile:read': 'View own profile',
  'profile:write': 'Edit own profile',
  
  // Blog permissions
  'blog:read': 'View blogs',
  'blog:write': 'Create and edit blogs',
  'blog:delete': 'Delete blogs',
  
  // Product permissions
  'product:read': 'View products',
  'product:write': 'Create and edit products',
  'product:delete': 'Delete products',
  
  // Service permissions
  'service:read': 'View services',
  'service:write': 'Create and edit services',
  'service:delete': 'Delete services',
  
  // User management permissions
  'user:read': 'View users',
  'user:write': 'Create and edit users',
  'user:delete': 'Delete users',
  'user:manage': 'Manage user roles and permissions',
  
  // Settings permissions
  'settings:read': 'View settings',
  'settings:write': 'Edit settings',
  
  // Admin permissions
  'admin:access': 'Access admin panel',
  '*': 'All permissions (Super Admin)',
} as const;

export type Permission = keyof typeof PERMISSIONS;

export const ROLES = {
  admin: {
    name: 'Administrator',
    permissions: ['*'],
  },
  editor: {
    name: 'Editor',
    permissions: [
      'profile:read',
      'profile:write',
      'blog:read',
      'blog:write',
      'blog:delete',
      'product:read',
      'product:write',
      'service:read',
      'service:write',
      'admin:access',
    ],
  },
  user: {
    name: 'User',
    permissions: ['profile:read', 'profile:write'],
  },
} as const;

export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  if (userPermissions.includes('*')) return true;
  return userPermissions.includes(requiredPermission);
}

export function hasAnyPermission(userPermissions: string[], requiredPermissions: string[]): boolean {
  if (userPermissions.includes('*')) return true;
  return requiredPermissions.some(permission => userPermissions.includes(permission));
}