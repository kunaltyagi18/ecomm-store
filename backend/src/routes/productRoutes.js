/**
 * Product Routes
 * GET /products - Get all products
 * GET /products/:id - Get single product
 */

import express from "express";
import {
  getAllProductsController,
  getProductByIdController
} from "../controllers/productController.js";

const router = express.Router();

/**
 * GET /products
 * Get all products
 */
router.get("/", getAllProductsController);

/**
 * GET /products/:id
 * Get single product by ID
 */
router.get("/:id", getProductByIdController);

export default router;
