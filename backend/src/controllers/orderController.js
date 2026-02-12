/**
 * Order Controller
 * Handles order-related business logic and transactions
 */

import {
  getAllOrders,
  getUserOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} from "../models/Order.js";

import {
  getProductById
} from "../models/Product.js";

import {
  reduceProductStock
} from "./productController.js";

/**
 * Create a new order
 * POST /orders
 * 
 * Dummy Transaction Logic:
 * 1. Validate user exists
 * 2. Check product stock for all items
 * 3. Reduce stock for all products
 * 4. Create order with paymentStatus = "Success"
 * 5. Return created order
 */
export const createOrderController = (req, res) => {
  try {
    const { userId, products } = req.body;

    // Validate input
    if (!userId || !products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User ID and products array are required"
      });
    }

    // TODO: Validate user exists
    // import { getUserById } from "../models/User.js";
    // const user = getUserById(userId);
    // if (!user) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "User not found"
    //   });
    // }

    let totalAmount = 0;
    const processedProducts = [];

    // Step 1: Check stock and build order items
    for (const item of products) {
      const { productId, quantity } = item;

      if (!productId || !quantity) {
        return res.status(400).json({
          success: false,
          message: "Each product must have productId and quantity"
        });
      }

      const product = getProductById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${productId} not found`
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${quantity}`
        });
      }

      totalAmount += product.price * quantity;
      processedProducts.push({
        productId,
        quantity,
        price: product.price,
        name: product.name
      });
    }

    // Step 2: Reduce product stock for all items
    // TODO: Wrap in database transaction
    // BEGIN TRANSACTION;
    try {
      for (const item of processedProducts) {
        reduceProductStock(item.productId, item.quantity);
      }
    } catch (error) {
      // ROLLBACK TRANSACTION;
      return res.status(400).json({
        success: false,
        message: "Error processing order",
        error: error.message
      });
    }

    // Step 3: Create order with dummy payment status = "Success"
    // TODO: Replace with: INSERT INTO orders (user_id, products, total_amount, payment_status) VALUES (...);
    const newOrder = createOrder({
      userId,
      products: processedProducts,
      totalAmount
    });

    // COMMIT TRANSACTION;

    res.status(201).json({
      success: true,
      data: newOrder,
      message: "Order created successfully with dummy payment",
      paymentStatus: "Success" // Dummy confirmation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message
    });
  }
};

/**
 * Get user orders
 * GET /orders/:userId
 */
export const getUserOrdersController = (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    // TODO: SELECT * FROM orders WHERE user_id = $1;
    const userOrders = getUserOrders(userId);

    if (userOrders.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No orders found for this user"
      });
    }

    res.status(200).json({
      success: true,
      data: userOrders,
      message: "Orders fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message
    });
  }
};

/**
 * Get single order
 * GET /orders/detail/:orderId
 */
export const getOrderByIdController = (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required"
      });
    }

    // TODO: SELECT * FROM orders WHERE id = $1;
    const order = getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      data: order,
      message: "Order fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message
    });
  }
};

/**
 * Get all orders (admin only)
 * GET /admin/orders
 */
export const getAllOrdersController = (req, res) => {
  try {
    // TODO: Add authentication check - verify if user is admin

    const allOrders = getAllOrders();

    res.status(200).json({
      success: true,
      data: allOrders,
      message: "All orders fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message
    });
  }
};

export default {
  createOrderController,
  getUserOrdersController,
  getOrderByIdController,
  getAllOrdersController
};
