/**
 * Express Server Setup
 * Ecomm Hub Backend
 * 
 * This is the main entry point for the backend server.
 * Uses PostgreSQL for data storage with connection pooling.
 */

import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { initializeDatabase } from "./db/connection.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ============================================
   MIDDLEWARE
   ============================================ */

/**
 * CORS Configuration
 * Allows requests from frontend
 */
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"], // Vite dev server
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

/**
 * Body Parser Middleware
 * Parse incoming JSON requests
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Request Logging Middleware
 */
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/* ============================================
   ROUTES
   ============================================ */

/**
 * API Routes
 */
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

/**
 * Health Check Endpoint
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

/**
 * Root Endpoint
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Ecomm Hub Backend API",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      users: "/api/users",
      orders: "/api/orders"
    }
  });
});

/* ============================================
   ERROR HANDLING
   ============================================ */

/**
 * 404 Handler (must be last)
 */
app.use(notFoundHandler);

/**
 * Error Handler (must be last)
 */
app.use(errorHandler);

/* ============================================
   SERVER START
   ============================================ */

const startServer = async () => {
  try {
    // Initialize database
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════╗
║      Ecomm Hub Backend (PostgreSQL)           ║
║                                                ║
║  Server is running on: http://localhost:${PORT}  ║
║  Health Check: http://localhost:${PORT}/health  ║
║                                                ║
║  Database: PostgreSQL Connected               ║
║                                                ║
║  Available Endpoints:                          ║
║  • GET  /api/products                         ║
║  • GET  /api/products/:id                     ║
║  • POST /api/users                            ║
║  • GET  /api/users/:id                        ║
║  • POST /api/orders                           ║
║  • GET  /api/orders/:userId                   ║
║                                                ║
╚════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
