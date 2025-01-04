export type UserRole = 'admin' | 'collector';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
}

export interface Admin extends User {
  password: string;
}

export const hasPermission = (role: UserRole, permission: string): boolean => {
  const permissions = {
    admin: ['all'],
    collector: ['orders.view', 'orders.edit', 'orders.list']
  };

  return role === 'admin' || permissions[role].includes(permission);
};