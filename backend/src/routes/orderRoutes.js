/**
 * Order Routes
 * POST /orders - Create new order
 * GET /orders/:userId - Get user orders
 * GET /orders/detail/:orderId - Get single order
 * GET /admin/orders - Get all orders (admin only)
 */

import express from "express";
import {
  createOrderController,
  getUserOrdersController,
  getOrderByIdController,
  getAllOrdersController
} from "../controllers/orderController.js";

const router = express.Router();

/**
 * POST /orders
 * Create a new order
 */
router.post("/", createOrderController);

/**
 * GET /orders/:userId
 * Get all orders for a specific user
 */
router.get("/:userId", getUserOrdersController);

/**
 * GET /orders/detail/:orderId
 * Get single order by ID
 * Note: This should be before the /:userId route to match exactly
 */
router.get("/detail/:orderId", getOrderByIdController);

/**
 * GET /admin/orders
 * Get all orders (admin only)
 * TODO: Add authentication middleware to verify admin
 */
router.get("/admin/all", getAllOrdersController);

export default router;
