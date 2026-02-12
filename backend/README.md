# Ecomm Hub Backend

A full-stack E-Commerce backend built with Node.js and Express.

## Features

- ✅ RESTful API with Express.js
- ✅ CORS enabled
- ✅ In-memory data storage (easily replaceable with PostgreSQL)
- ✅ MVC architecture (Models, Controllers, Routes)
- ✅ Dummy payment transaction logic
- ✅ Product inventory management
- ✅ User creation
- ✅ Order management

## Project Structure

```
backend/
├── src/
│   ├── models/
│   │   ├── Product.js      # Product in-memory storage
│   │   ├── User.js         # User in-memory storage
│   │   └── Order.js        # Order in-memory storage
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── userController.js
│   │   └── orderController.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   └── server.js           # Express app entry point
├── package.json
└── .gitignore
```

## Installation

```bash
npm install
```

## Running the Server

### Development (with auto-reload)
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Products
- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get single product

### Users
- **POST** `/api/users` - Create new user
  - Body: `{ name, email, password }`
- **GET** `/api/users/:id` - Get user profile

### Orders
- **POST** `/api/orders` - Create new order
  - Body: `{ userId, products: [{ productId, quantity }, ...] }`
  - Returns: `{ id, userId, products, totalAmount, paymentStatus: "Success" }`
- **GET** `/api/orders/:userId` - Get user's orders
- **GET** `/api/orders/detail/:orderId` - Get single order details

### Health Check
- **GET** `/health` - Server health status

## Sample Requests

### Create User
```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Order
```bash
POST /api/orders
Content-Type: application/json

{
  "userId": "1",
  "products": [
    { "productId": "1", "quantity": 2 },
    { "productId": "3", "quantity": 1 }
  ]
}
```

## Dummy Data

The backend comes with sample dummy data:

- **5 Products** (Electronics and Accessories)
- **2 Users** (Sample users with orders)
- **2 Orders** (Sample orders for testing)

All data is stored in-memory and will reset when the server restarts.

## Future: PostgreSQL Integration

To replace in-memory storage with PostgreSQL:

1. Install PostgreSQL driver:
   ```bash
   npm install pg
   ```

2. Create database connection in `src/db/connection.js`:
   ```javascript
   import pkg from 'pg';
   const { Pool } = pkg;

   export const pool = new Pool({
     connectionString: process.env.DATABASE_URL
   });
   ```

3. Replace model functions with SQL queries:
   - See TODO comments in each model file
   - Update controllers to use database queries
   - Add error handling and validation

Example conversion for getProductById:
```javascript
// Before (in-memory)
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

// After (PostgreSQL)
export const getProductById = async (id) => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};
```

## Error Handling

All endpoints return structured JSON responses:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": { /* error details in development */ }
}
```

## Transaction Logic (Orders)

When creating an order:

1. **Validate** inputs and check user exists
2. **Stock Check** - Verify all products have sufficient stock
3. **Process** - Deduct stock from inventory
4. **Create** - Create order with `paymentStatus: "Success"`
5. **Return** - Send order confirmation

If any step fails, the order is not created (transaction rollback pattern).

## Development Notes

- The code is clean and ready for PostgreSQL integration
- Each model file has TODO comments for SQL replacement
- All business logic is in controllers for easy maintenance
- CORS is configured for frontend at `localhost:3000` and `localhost:5173`
- Express.json() middleware handles JSON parsing

## License

MIT
