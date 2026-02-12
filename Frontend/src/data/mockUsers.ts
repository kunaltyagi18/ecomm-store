import { User } from '@/types';

export const mockUsers: User[] = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    _id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
];

// Mock credentials for testing
export const mockCredentials = {
  user: { email: 'john@example.com', password: 'password123' },
  admin: { email: 'admin@example.com', password: 'admin123' },
};
