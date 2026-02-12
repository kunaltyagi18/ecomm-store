/**
 * User Controller
 * Handles user-related business logic
 */

import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser
} from "../models/User.js";

/**
 * Create a new user
 * POST /users
 */
export const createUserController = (req, res) => {
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

    // TODO: In production, use bcrypt to hash password
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = createUser({
      name,
      email,
      password // In real app, hash this
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      data: userWithoutPassword,
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
export const getUserProfileController = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const user = getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      data: userWithoutPassword,
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
export const getAllUsersController = (req, res) => {
  try {
    // TODO: Add authentication check - verify if user is admin
    const users = getAllUsers();

    // Return users without passwords
    const usersWithoutPasswords = users.map(({ password: _, ...user }) => user);

    res.status(200).json({
      success: true,
      data: usersWithoutPasswords,
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

export default {
  createUserController,
  getUserProfileController,
  getAllUsersController
};
