import api, { USE_MOCK_DATA } from './api';
import { Order, CreateOrderData } from '@/types';
import { mockOrders } from '@/data/mockOrders';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Transform backend order response to frontend Order type
 * Backend: { id, userId, products, totalAmount, paymentStatus, orderStatus, createdAt, updatedAt }
 * Frontend: { _id, userId, items, shippingAddress, etc. }
 */
const transformBackendOrder = (backendOrder: any): Order => ({
  _id: backendOrder.id,
  userId: backendOrder.userId,
  items: backendOrder.products.map((p: any) => ({
    product: {
      _id: p.productId,
      title: p.name,
      description: '',
      price: p.price,
      stock: 0,
      category: '',
      image: '',
      rating: 0,
      numReviews: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    quantity: p.quantity,
    price: p.price,
  })),
  shippingAddress: {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  },
  paymentMethod: 'card',
  paymentStatus: backendOrder.paymentStatus === 'Success' ? 'paid' : 'pending',
  orderStatus: (backendOrder.orderStatus || 'processing').toLowerCase(),
  subtotal: backendOrder.totalAmount,
  shippingCost: 0,
  tax: 0,
  totalAmount: backendOrder.totalAmount,
  createdAt: backendOrder.createdAt,
  updatedAt: backendOrder.updatedAt,
});

export const orderService = {
  async create(data: CreateOrderData): Promise<Order> {
    if (USE_MOCK_DATA) {
      await delay(1000);
      
      // Simulate order creation
      const newOrder: Order = {
        _id: 'ord-' + Date.now(),
        userId: '1',
        items: [],
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod,
        paymentStatus: 'paid',
        orderStatus: 'pending',
        subtotal: 0,
        shippingCost: 10,
        tax: 0,
        totalAmount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return newOrder;
    }

    try {
      // Get current user ID from context or localStorage
      const userId = localStorage.getItem('userId') || '1';

      // Transform frontend order format to backend format
      const backendOrderData = {
        userId,
        products: data.items.map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
      };

      const response = await api.post<any>('/orders', backendOrderData);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return transformBackendOrder(response.data.data);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async getMyOrders(): Promise<Order[]> {
    if (USE_MOCK_DATA) {
      await delay(500);
      return mockOrders;
    }

    try {
      // Get current user ID from context or localStorage
      const userId = localStorage.getItem('userId') || '1';

      const response = await api.get<any>(`/orders/${userId}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data.map(transformBackendOrder);
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<Order> {
    if (USE_MOCK_DATA) {
      await delay(300);
      const order = mockOrders.find(o => o._id === id);
      if (!order) throw new Error('Order not found');
      return order;
    }

    try {
      const response = await api.get<any>(`/orders/detail/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return transformBackendOrder(response.data.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Admin endpoints
  async getAll(): Promise<Order[]> {
    if (USE_MOCK_DATA) {
      await delay(500);
      return mockOrders;
    }

    try {
      const response = await api.get<any>('/admin/orders');
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data.data.map(transformBackendOrder);
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  },

  async updateStatus(id: string, status: Order['orderStatus']): Promise<Order> {
    if (USE_MOCK_DATA) {
      await delay(400);
      const order = mockOrders.find(o => o._id === id);
      if (!order) throw new Error('Order not found');
      return { ...order, orderStatus: status, updatedAt: new Date().toISOString() };
    }
    
    // Backend doesn't have update status endpoint yet (admin feature)
    throw new Error('Update order status not available');
  },
};
