# 🛍️ Ecomm Hub - Full-Stack E-Commerce Application

A complete full-stack e-commerce application with React frontend and Node.js/Express backend.

## 📦 Project Structure

```
ecomm-hub/
├── src/                          # React Frontend
│   ├── components/               # React components
│   ├── pages/                    # Page components
│   ├── services/                 # API service layer
│   ├── context/                  # Context API for state
│   └── types/                    # TypeScript types
├── backend/                      # Node.js/Express Backend
│   ├── src/
│   │   ├── models/              # In-memory data storage
│   │   ├── controllers/         # Business logic
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Express middleware
│   │   └── server.js            # Express app setup
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or bun package manager

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Start the Backend Server

```bash
npm run dev
```

The backend will start on `http://localhost:5000`

You should see:
```
╔════════════════════════════════════════════════╗
║         Ecomm Hub Backend Server              ║
║                                                ║
║  Server is running on: http://localhost:5000  ║
║  Health Check: http://localhost:5000/health   ║
╚════════════════════════════════════════════════╝
```

### Step 3: Install Frontend Dependencies (in another terminal)

```bash
npm install
```

### Step 4: Start the Frontend Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### Step 5: Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## 🔌 Frontend to Backend Integration

The frontend is configured to call the backend API at `http://localhost:5000/api`

**To switch between mock data and backend API:**

Edit [src/services/api.ts](src/services/api.ts):

```typescript
// Current setting (using backend):
export const USE_MOCK_DATA = false;

// To use mock data instead:
export const USE_MOCK_DATA = true;
```

## 📡 Backend API Endpoints

### Products
```
GET  /api/products          - Get all products
GET  /api/products/:id      - Get single product by ID
```

**Example:**
```bash
curl http://localhost:5000/api/products
```

### Users
```
POST /api/users             - Create new user
  Body: { name, email, password }
  
GET  /api/users/:id         - Get user profile
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password"}'
```

### Orders
```
POST /api/orders            - Create new order
  Body: { userId, products: [{ productId, quantity }, ...] }
  
GET  /api/orders/:userId    - Get user's orders
GET  /api/orders/detail/:id - Get single order details
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":"1","products":[{"productId":"1","quantity":2}]}'
```

## 🌟 Features Implemented

### Frontend (React + TypeScript)
- ✅ Product listing and filtering
- ✅ Product details page
- ✅ Shopping cart (Context API)
- ✅ Checkout process
- ✅ Order history
- ✅ User registration
- ✅ Wishlist functionality
- ✅ Admin dashboard (orders & analytics)
- ✅ Responsive design
- ✅ Tailwind CSS styling

### Backend (Node.js/Express)
- ✅ RESTful API with Express.js
- ✅ CORS enabled
- ✅ In-memory data storage (ready for PostgreSQL)
- ✅ MVC architecture
- ✅ Error handling middleware
- ✅ Dummy transaction logic
- ✅ Stock management
- ✅ Order creation with inventory reduction
- ✅ Proper API response format

## 📋 Sample Data

The backend comes with dummy data:

### Products
1. Wireless Headphones - $99.99
2. USB-C Cable - $12.99
3. Wireless Mouse - $29.99
4. Laptop Stand - $45.99
5. Portable Charger - $34.99

### Users
1. John Doe (john@example.com)
2. Jane Smith (jane@example.com)

### Orders
- Sample orders for testing

## 🔄 How Orders Work

1. **Validate** - Check user and products exist
2. **Check Stock** - Verify all products have sufficient inventory
3. **Process** - Reduce product stock by ordered quantity
4. **Create** - Create order with `paymentStatus: "Success"`
5. **Return** - Send order confirmation to user

## 🗄️ Future: PostgreSQL Integration

### To switch from in-memory to PostgreSQL:

1. **Install PostgreSQL package:**
```bash
cd backend
npm install pg
```

2. **Create a database connection file** (`src/db/connection.js`):
```javascript
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
```

3. **Update models** - Replace in-memory arrays with SQL queries

Example conversion:
```javascript
// Before (in-memory)
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

// After (PostgreSQL)
export const getProductById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );
  return result.rows[0];
};
```

4. **Update .env file:**
```
DATABASE_URL=postgresql://user:password@localhost:5432/ecomm_hub
NODE_ENV=production
```

5. **Add to server.js:**
```javascript
import { pool } from './db/connection.js';

app.get('/health', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json({ connected: !!result.rows });
});
```

All TODO comments in the code indicate where PostgreSQL queries should be added.

## 🛠️ Development

### Frontend Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run ViteTest tests
npm run test

# Lint code
npm run lint
```

### Backend Development Commands

```bash
# Start with auto-reload
npm run dev

# Start production server
npm start
```

## 📝 API Response Format

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
  "error": { /* details in development */ }
}
```

## 🧪 Testing the APIs

### Test with cURL

**Get all products:**
```bash
curl http://localhost:5000/api/products
```

**Get single product:**
```bash
curl http://localhost:5000/api/products/1
```

**Create user:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Create order:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "1",
    "products": [
      { "productId": "1", "quantity": 2 },
      { "productId": "3", "quantity": 1 }
    ]
  }'
```

**Get user orders:**
```bash
curl http://localhost:5000/api/orders/1
```

## 📱 Frontend UI

The frontend has multiple pages:

- **/**: Home page with featured products
- **/products**: Products listing with filters
- **/products/:id**: Product details
- **/cart**: Shopping cart
- **/checkout**: Checkout process
- **/profile**: User profile
- **/orders**: Order history
- **/wishlist**: Wishlist items
- **/admin**: Admin dashboard (orders & analytics)
- **/login**: User login
- **/register**: User registration

## 🌐 CORS Configuration

Backend CORS is configured for:
- `http://localhost:3000` (Create React App)
- `http://localhost:5173` (Vite)

Update `src/server.js` to add more origins:
```javascript
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://yourdomain.com'],
  credentials: true,
};
```

## 📦 Dependencies

### Frontend
- React 18+
- TypeScript
- Tailwind CSS
- Lucide Icons
- React Router
- Axios

### Backend
- Express.js 4.18+
- CORS 2.8+
- UUID 9.0+

## 🚨 Important Notes

- **In-Memory Storage**: All data resets when the backend server restarts
- **No Authentication**: Currently using mock authentication for demo
- **Dummy Payment**: All orders automatically succeed with `paymentStatus: "Success"`
- **Stock Management**: Stock is deducted in real-time when orders are created

## 📚 Documentation

- [Backend README](./backend/README.md) - Backend-specific documentation
- [Frontend Components](./src/components/README.md) - Component documentation

## 🤝 Contributing

Feel free to modify and extend this project. The code is structured for easy maintenance and scalability.

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## ❓ FAQ

**Q: Can I deploy this to production?**
A: Yes! But you should add proper authentication, replace in-memory storage with PostgreSQL, and add payment gateway integration.

**Q: How do I add more products?**
A: Edit `backend/src/models/Product.js` and add to the `products` array, or implement an admin panel later.

**Q: How do I switch back to mock data?**
A: Set `USE_MOCK_DATA = true` in `src/services/api.ts`

**Q: What if I get CORS errors?**
A: Make sure the backend is running on port 5000 and check CORS settings in `backend/src/server.js`

## 🎯 Next Steps

1. Add user authentication with JWT tokens
2. Integrate PostgreSQL database
3. Add payment gateway (Stripe, PayPal)
4. Implement email notifications
5. Add product reviews and ratings
6. Create admin management interface
7. Add search and advanced filtering
8. Implement analytics dashboard

---

**Happy coding! 🚀**
