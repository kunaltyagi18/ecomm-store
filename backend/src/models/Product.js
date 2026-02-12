/**
 * Product Model
 * In-memory data storage for products
 * Replace with PostgreSQL queries later
 */

// In-memory storage for products
let products = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones",
    price: 99.99,
    stock: 50,
    category: "Electronics",
    image: "https://via.placeholder.com/300x300?text=Headphones"
  },
  {
    id: "2",
    name: "USB-C Cable",
    description: "High-speed 3m USB-C charging cable",
    price: 12.99,
    stock: 200,
    category: "Accessories",
    image: "https://via.placeholder.com/300x300?text=USB-C+Cable"
  },
  {
    id: "3",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with 2.4GHz connection",
    price: 29.99,
    stock: 80,
    category: "Electronics",
    image: "https://via.placeholder.com/300x300?text=Mouse"
  },
  {
    id: "4",
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand",
    price: 45.99,
    stock: 40,
    category: "Accessories",
    image: "https://via.placeholder.com/300x300?text=Laptop+Stand"
  },
  {
    id: "5",
    name: "Portable Charger",
    description: "20000mAh portable power bank with fast charging",
    price: 34.99,
    stock: 120,
    category: "Electronics",
    image: "https://via.placeholder.com/300x300?text=Power+Bank"
  },
];

/**
 * Get all products
 * TODO: Replace with: SELECT * FROM products;
 */
export const getAllProducts = () => {
  return products;
};

/**
 * Get single product by ID
 * TODO: Replace with: SELECT * FROM products WHERE id = $1;
 */
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

/**
 * Update product (for stock reduction)
 * TODO: Replace with: UPDATE products SET stock = $1 WHERE id = $2;
 */
export const updateProduct = (id, updateData) => {
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updateData };
    return products[index];
  }
  return null;
};

/**
 * Create a new product (admin only)
 * TODO: Replace with: INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4);
 */
export const createProduct = (productData) => {
  const newProduct = {
    id: String(products.length + 1),
    ...productData,
    stock: productData.stock || 0
  };
  products.push(newProduct);
  return newProduct;
};

export default {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct
};
