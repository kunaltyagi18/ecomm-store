import api, { USE_MOCK_DATA, transformBackendProduct } from './api';
import { Product, ProductFilters, ProductsResponse } from '@/types';
import { mockProducts } from '@/data/mockProducts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll(filters?: ProductFilters): Promise<ProductsResponse> {
    if (USE_MOCK_DATA) {
      await delay(500);
      
      let filtered = [...mockProducts];
      
      // Apply filters
      if (filters?.category && filters.category !== 'All') {
        filtered = filtered.filter(p => p.category === filters.category);
      }
      
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
        );
      }
      
      if (filters?.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= filters.minPrice!);
      }
      
      if (filters?.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice!);
      }
      
      // Apply sorting
      if (filters?.sort) {
        switch (filters.sort) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
        }
      }
      
      // Pagination
      const page = filters?.page || 1;
      const limit = filters?.limit || 12;
      const start = (page - 1) * limit;
      const paginatedProducts = filtered.slice(start, start + limit);
      
      return {
        products: paginatedProducts,
        total: filtered.length,
        page,
        pages: Math.ceil(filtered.length / limit),
      };
    }

    try {
      // Call backend API to get all products
      const response = await api.get<any>('/products');
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Transform backend response to frontend format
      const products = response.data.data.map(transformBackendProduct);

      // Apply client-side filtering and sorting
      let filtered = [...products];

      if (filters?.category && filters.category !== 'All') {
        filtered = filtered.filter(p => p.category === filters.category);
      }

      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
        );
      }

      // Pagination
      const page = filters?.page || 1;
      const limit = filters?.limit || 12;
      const start = (page - 1) * limit;
      const paginatedProducts = filtered.slice(start, start + limit);

      return {
        products: paginatedProducts,
        total: filtered.length,
        page,
        pages: Math.ceil(filtered.length / limit),
      };
    } catch (error) {
      console.error('Error fetching products from backend:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<Product> {
    if (USE_MOCK_DATA) {
      await delay(300);
      const product = mockProducts.find(p => p._id === id);
      if (!product) throw new Error('Product not found');
      return product;
    }

    try {
      // Backend uses numeric IDs, but frontend uses _id
      const response = await api.get<any>(`/products/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return transformBackendProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product from backend:', error);
      throw error;
    }
  },

  async getFeatured(): Promise<Product[]> {
    if (USE_MOCK_DATA) {
      await delay(400);
      return mockProducts.filter(p => p.isFeatured);
    }

    try {
      // Backend doesn't have a featured endpoint, so get all and filter
      const response = await api.get<any>('/products');
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Return first 6 products as featured
      return response.data.data.slice(0, 6).map(transformBackendProduct);
    } catch (error) {
      console.error('Error fetching featured products from backend:', error);
      throw error;
    }
  },

  async create(data: Partial<Product>): Promise<Product> {
    if (USE_MOCK_DATA) {
      await delay(600);
      const newProduct: Product = {
        _id: Date.now().toString(),
        title: data.title || '',
        description: data.description || '',
        price: data.price || 0,
        category: data.category || '',
        image: data.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500',
        stock: data.stock || 0,
        rating: 0,
        numReviews: 0,
        isFeatured: data.isFeatured || false,
        isDigital: data.isDigital || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newProduct;
    }
    
    // Backend create not implemented yet (would be admin only)
    throw new Error('Create product not available');
  },

  async update(id: string, data: Partial<Product>): Promise<Product> {
    if (USE_MOCK_DATA) {
      await delay(500);
      const product = mockProducts.find(p => p._id === id);
      if (!product) throw new Error('Product not found');
      return { ...product, ...data, updatedAt: new Date().toISOString() };
    }
    
    // Backend update not implemented yet (would be admin only)
    throw new Error('Update product not available');
  },

  async delete(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await delay(400);
      return;
    }
    
    // Backend delete not implemented yet (would be admin only)
    throw new Error('Delete product not available');
  },
};
