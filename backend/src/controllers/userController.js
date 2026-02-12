/**
 * User Controller
 * Handles user-related business logic
 */

import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  verifyUserPassword
} from "../models/User.js";

/**
 * Create a new user
 * POST /users
 */
export const createUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      });
    }

    const newUser = await createUser({
      name,
      email,
      password // Password is hashed in the model
    });

    res.status(201).json({
      success: true,
      data: newUser,
      message: "User created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Error creating user",
      error: error.message
    });
  }
};

/**
 * Get user profile
 * GET /users/:id
 */
export const getUserProfileController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: "User profile fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: error.message
    });
  }
};

/**
 * Get all users (admin only)
 * GET /users
 */
export const getAllUsersController = async (req, res) => {
  try {
    // TODO: Add authentication check - verify if user is admin
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
      message: "Users fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
};

/**
 * Update user profile
 * PUT /users/:id
 */
export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await updateUser(id, { name, email });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message
    });
  }
};

/**
 * Delete user
 * DELETE /users/:id
 */
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message
    });
  }
};

/**
 * User login
 * POST /users/login
 */
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await verifyUserPassword(email, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // TODO: Generate JWT token here
    res.status(200).json({
      success: true,
      data: user,
      message: "Login successful"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message
    });
  }
};

export default {
  createUserController,
  getUserProfileController,
  getAllUsersController,
  updateUserController,
  deleteUserController,
  loginUserController
};
