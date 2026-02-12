/**
 * User Model
 * PostgreSQL database queries for users
 */

import { query } from '../db/connection.js';
import bcryptjs from 'bcryptjs';

/**
 * Get all users (admin only)
 * SELECT * FROM users;
 */
export const getAllUsers = async () => {
  try {
    const result = await query(
      'SELECT id, name, email, created_at, updated_at FROM users ORDER BY created_at DESC'
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Get user by ID
 * SELECT * FROM users WHERE id = $1;
 */
export const getUserById = async (id) => {
  try {
    const result = await query(
      'SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

/**
 * Get user by email
 * SELECT * FROM users WHERE email = $1;
 */
export const getUserByEmail = async (email) => {
  try {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};

/**
 * Create a new user
 * INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
 */
export const createUser = async (userData) => {
  try {
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(userData.password, salt);

    const result = await query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at, updated_at`,
      [userData.name, userData.email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Verify user password
 */
export const verifyUserPassword = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
};

/**
 * Update user details
 * UPDATE users SET name = $1, email = $2 WHERE id = $3;
 */
export const updateUser = async (id, updateData) => {
  try {
    const { name, email } = updateData;
    const result = await query(
      `UPDATE users 
       SET name = COALESCE($1, name),
           email = COALESCE($2, email),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING id, name, email, created_at, updated_at`,
      [name, email, id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Delete user
 */
export const deleteUser = async (id) => {
  try {
    const result = await query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser
};
