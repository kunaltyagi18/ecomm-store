/**
 * Product Controller
 * Handles product-related business logic
 */

import {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct
} from "../models/Product.js";

/**
 * Get all products
 * GET /products
 */
export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();
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
export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    const product = await getProductById(id);

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
 * Create a new product (admin only)
 * POST /products
 */
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required"
      });
    }

    const newProduct = await createProduct({
      name,
      description,
      price,
      stock,
      category,
      image
    });

    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message
    });
  }
};

/**
 * Update product
 * PUT /products/:id
 */
export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await updateProduct(id, updateData);

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message
    });
  }
};

/**
 * Delete product
 * DELETE /products/:id
 */
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: deletedProduct,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message
    });
  }
};

/**
 * Reduce product stock
 * Used internally when creating orders
 */
export const reduceProductStock = async (productId, quantity) => {
  const product = await getProductById(productId);

  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  if (product.stock < quantity) {
    throw new Error(`Insufficient stock for product: ${product.name}. Available: ${product.stock}`);
  }

  const updatedProduct = await updateProduct(productId, {
    stock: product.stock - quantity
  });

  return updatedProduct;
};

export default {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
  reduceProductStock
};
