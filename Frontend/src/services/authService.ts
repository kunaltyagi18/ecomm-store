import api, { USE_MOCK_DATA } from './api';
import { User, AuthResponse, LoginCredentials, RegisterCredentials } from '@/types';
import { mockUsers, mockCredentials } from '@/data/mockUsers';

// Simulate network delay for mock data
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Transform backend user response to frontend User type
 * Backend: { id, name, email }
 * Frontend: { _id, name, email, role }
 */
const transformBackendUser = (backendUser: any, token?: string): User => ({
  _id: backendUser.id,
  name: backendUser.name,
  email: backendUser.email,
  role: 'user',
  createdAt: backendUser.createdAt || new Date().toISOString(),
  updatedAt: backendUser.updatedAt || new Date().toISOString(),
});

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      await delay(800);
      
      // Check mock credentials
      if (
        (credentials.email === mockCredentials.user.email && credentials.password === mockCredentials.user.password) ||
        (credentials.email === mockCredentials.admin.email && credentials.password === mockCredentials.admin.password)
      ) {
        const user = mockUsers.find(u => u.email === credentials.email)!;
        const token = 'mock-jwt-token-' + user._id;
        return { user, token };
      }
      
      throw new Error('Invalid email or password');
    }

    try {
      // Backend doesn't have login endpoint yet (would need JWT auth)
      // For now, use mock login
      throw new Error('Login with backend not implemented yet. Use mock data.');
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  async register(data: RegisterCredentials): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      await delay(800);
      
      // Check if email already exists
      if (mockUsers.some(u => u.email === data.email)) {
        throw new Error('Email already registered');
      }
      
      const newUser: User = {
        _id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const token = 'mock-jwt-token-' + newUser._id;
      return { user: newUser, token };
    }

    try {
      // Call backend to create user
      const response = await api.post<any>('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const user = transformBackendUser(response.data.data);
      
      // Generate a simple token for now (in production, backend would return JWT)
      const token = 'bearer-token-' + user._id;

      return { user, token };
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  async getProfile(): Promise<User> {
    if (USE_MOCK_DATA) {
      await delay(300);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      throw new Error('Not authenticated');
    }

    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('Not authenticated');
      }

      const response = await api.get<any>(`/users/${userId}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return transformBackendUser(response.data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    if (USE_MOCK_DATA) {
      await delay(500);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = { ...JSON.parse(storedUser), ...data };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
      throw new Error('Not authenticated');
    }
    
    // Backend doesn't have update profile endpoint yet
    throw new Error('Update profile not available');
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  },
};
