/**
 * Order Model
 * PostgreSQL database queries for orders
 */

import { query, getClient } from '../db/connection.js';

/**
 * Get all orders (admin only)
 * SELECT * FROM orders;
 */
export const getAllOrders = async () => {
  try {
    const result = await query(`
      SELECT o.*, 
             json_agg(json_build_object('productId', oi.product_id, 'quantity', oi.quantity, 'price', oi.price)) as products
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Get user orders by user ID
 * SELECT * FROM orders WHERE user_id = $1;
 */
export const getUserOrders = async (userId) => {
  try {
    const result = await query(`
      SELECT o.*, 
             json_agg(json_build_object('productId', oi.product_id, 'quantity', oi.quantity, 'price', oi.price)) as products
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [userId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

/**
 * Get order by ID
 * SELECT * FROM orders WHERE id = $1;
 */
export const getOrderById = async (id) => {
  try {
    const result = await query(`
      SELECT o.*, 
             json_agg(json_build_object('productId', oi.product_id, 'quantity', oi.quantity, 'price', oi.price)) as products
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = $1
      GROUP BY o.id
    `, [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

/**
 * Create a new order
 * Handles transaction for order and order_items
 */
export const createOrder = async (orderData) => {
  const client = await getClient();
  
  try {
    await client.query('BEGIN');

    // Insert order
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, payment_status, order_status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [orderData.userId, orderData.totalAmount, 'Success', 'Processing']
    );

    const order = orderResult.rows[0];

    // Insert order items
    for (const product of orderData.products) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order.id, product.productId, product.quantity, product.price]
      );
    }

    await client.query('COMMIT');
    
    // Fetch the complete order with items
    return await getOrderById(order.id);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Update order status
 * UPDATE orders SET order_status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2;
 */
export const updateOrderStatus = async (id, status) => {
  try {
    const result = await query(
      `UPDATE orders 
       SET order_status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );
    
    if (result.rows[0]) {
      return await getOrderById(id);
    }
    return null;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export default {
  getAllOrders,
  getUserOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
};
