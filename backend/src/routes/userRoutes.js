/**
 * User Routes
 * POST /users - Create new user
 * GET /users/:id - Get user profile
 * GET /users - Get all users (admin only)
 */

import express from "express";
import {
  createUserController,
  getUserProfileController,
  getAllUsersController
} from "../controllers/userController.js";

const router = express.Router();

/**
 * POST /users
 * Create a new user
 */
router.post("/", createUserController);

/**
 * GET /users/:id
 * Get user profile by ID
 */
router.get("/:id", getUserProfileController);

/**
 * GET /users
 * Get all users (admin only)
 * TODO: Add authentication middleware to verify admin
 */
router.get("/", getAllUsersController);

export default router;
