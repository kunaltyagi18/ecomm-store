/**
 * Product Model
 * PostgreSQL database queries for products
 */

import { query } from '../db/connection.js';

/**
 * Get all products
 * SELECT * FROM products;
 */
export const getAllProducts = async () => {
  try {
    const result = await query('SELECT * FROM products ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Get single product by ID
 * SELECT * FROM products WHERE id = $1;
 */
export const getProductById = async (id) => {
  try {
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Update product (for stock reduction)
 * UPDATE products SET stock = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2;
 */
export const updateProduct = async (id, updateData) => {
  try {
    const { name, description, price, stock, category, image } = updateData;
    const result = await query(
      `UPDATE products 
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           price = COALESCE($3, price),
           stock = COALESCE($4, stock),
           category = COALESCE($5, category),
           image = COALESCE($6, image),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [name, description, price, stock, category, image, id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Create a new product (admin only)
 * INSERT INTO products (name, description, price, stock, category, image) VALUES ($1, $2, $3, $4, $5, $6);
 */
export const createProduct = async (productData) => {
  try {
    const { name, description, price, stock = 0, category, image } = productData;
    const result = await query(
      `INSERT INTO products (name, description, price, stock, category, image)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, price, stock, category || null, image || null]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Delete product (admin only)
 */
export const deleteProduct = async (id) => {
  try {
    const result = await query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export default {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct
};
