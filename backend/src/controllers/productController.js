/**
 * Product Controller
 * Handles product-related business logic
 */

import {
  getAllProducts,
  getProductById,
  updateProduct
} from "../models/Product.js";

/**
 * Get all products
 * GET /products
 */
export const getAllProductsController = (req, res) => {
  try {
    const products = getAllProducts();
    res.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message
    });
  }
};

/**
 * Get single product by ID
 * GET /products/:id
 */
export const getProductByIdController = (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    const product = getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product,
      message: "Product fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message
    });
  }
};

/**
 * Reduce product stock
 * Used internally when creating orders
 */
export const reduceProductStock = (productId, quantity) => {
  const product = getProductById(productId);

  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  if (product.stock < quantity) {
    throw new Error(`Insufficient stock for product: ${product.name}. Available: ${product.stock}`);
  }

  // TODO: Replace with: UPDATE products SET stock = stock - $1 WHERE id = $2;
  const updatedProduct = updateProduct(productId, {
    stock: product.stock - quantity
  });

  return updatedProduct;
};

export default {
  getAllProductsController,
  getProductByIdController,
  reduceProductStock
};
