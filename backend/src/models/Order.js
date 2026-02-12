/**
 * Order Model
 * In-memory data storage for orders
 * Replace with PostgreSQL queries later
 */

// In-memory storage for orders
let orders = [
  {
    id: "1",
    userId: "1",
    products: [
      { productId: "1", quantity: 1, price: 99.99 }
    ],
    totalAmount: 99.99,
    paymentStatus: "Success",
    orderStatus: "Delivered",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "2",
    userId: "1",
    products: [
      { productId: "3", quantity: 2, price: 29.99 },
      { productId: "2", quantity: 1, price: 12.99 }
    ],
    totalAmount: 72.97,
    paymentStatus: "Success",
    orderStatus: "Processing",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
];

let orderCounter = orders.length;

/**
 * Get all orders (admin only)
 * TODO: Replace with: SELECT * FROM orders;
 */
export const getAllOrders = () => {
  return orders;
};

/**
 * Get user orders by user ID
 * TODO: Replace with: SELECT * FROM orders WHERE user_id = $1;
 */
export const getUserOrders = (userId) => {
  return orders.filter(order => order.userId === userId);
};

/**
 * Get order by ID
 * TODO: Replace with: SELECT * FROM orders WHERE id = $1;
 */
export const getOrderById = (id) => {
  return orders.find(order => order.id === id);
};

/**
 * Create a new order
 * TODO: Replace with: INSERT INTO orders (user_id, products, total_amount, payment_status) VALUES ($1, $2, $3, $4);
 */
export const createOrder = (orderData) => {
  const newOrder = {
    id: String(++orderCounter),
    userId: orderData.userId,
    products: orderData.products, // Array of { productId, quantity, price }
    totalAmount: orderData.totalAmount,
    paymentStatus: "Success", // Dummy payment always succeeds
    orderStatus: "Processing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  orders.push(newOrder);
  return newOrder;
};

/**
 * Update order status
 * TODO: Replace with: UPDATE orders SET order_status = $1, updated_at = $2 WHERE id = $3;
 */
export const updateOrderStatus = (id, status) => {
  const order = getOrderById(id);
  if (!order) return null;

  order.orderStatus = status;
  order.updatedAt = new Date().toISOString();
  return order;
};

export default {
  getAllOrders,
  getUserOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
};
