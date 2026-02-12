# 🛍️ E-Commerce Hub

A full-stack e-commerce application built with React, TypeScript, and Node.js/Express. This project provides a complete shopping experience with product browsing, cart management, order processing, and admin dashboard.

## ✨ Features

- **User Authentication** - Secure login and registration
- **Product Catalog** - Browse and search products with detailed information
- **Shopping Cart** - Add, remove, and manage cart items
- **Wishlist** - Save favorite products for later
- **Order Management** - Place orders and track order history
- **Admin Dashboard** - Manage products, view analytics, and track orders
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Updates** - Dynamic content loading and updates

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Context API** - State management
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web server framework
- **PostgreSQL** - Relational SQL database
- **pg** - PostgreSQL client for Node.js
- **bcryptjs** - Password hashing
- **JWT** - Authentication tokens

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn** or **bun**
- **Git**
- **PostgreSQL** (v12 or higher) - Download from [postgresql.org](https://www.postgresql.org/download/)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/kunaltyagi18/ecomm-store.git
cd ecomm-store
```

### 2. Setup PostgreSQL Database
```bash
# Create a new PostgreSQL database
createdb ecomm_store
```

### 3. Setup Backend
```bash
cd backend
npm install
# or
yarn install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development

# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=ecomm_store

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_should_be_long_and_random

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 4. Setup Frontend
```bash
cd ../Frontend
npm install
# or
yarn install
```

Create a `.env` file in the Frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
ecomm-store/
├── backend/                          # Backend server
│   ├── src/
│   │   ├── db/                      # Database connection & initialization
│   │   ├── controllers/             # Route handlers
│   │   ├── models/                  # Database models (User, Product, Order)
│   │   ├── routes/                  # API endpoints
│   │   ├── middleware/              # Custom middleware
│   │   └── server.js                # Main server file
│   ├── package.json
│   ├── .env.example                 # Environment variables template
│   └── .gitignore
│
├── Frontend/                         # React frontend application
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── admin/               # Admin dashboard components
│   │   │   ├── auth/                # Authentication components
│   │   │   ├── cart/                # Cart components
│   │   │   ├── layout/              # Layout components
│   │   │   ├── order/               # Order components
│   │   │   ├── product/             # Product components
│   │   │   └── ui/                  # UI components (buttons, cards, etc.)
│   │   ├── pages/                   # Page components
│   │   ├── context/                 # React Context (Auth, Cart, Wishlist)
│   │   ├── services/                # API services
│   │   ├── types/                   # TypeScript types
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── data/                    # Mock data
│   │   ├── App.tsx                  # Main App component
│   │   └── main.tsx                 # Entry point
│   ├── public/                       # Static files
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .gitignore
│
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

## 🏃 Running the Application

### Start Backend Server
```bash
cd backend
npm start
# Server will run on http://localhost:5000
```

### Start Frontend Development Server
```bash
cd Frontend
npm run dev
# Application will open on http://localhost:5173
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

## 🔑 Key Pages

### User Pages
- **Home** - Landing page with featured products
- **Products** - Browse all products with filters
- **Product Details** - Detailed product information
- **Cart** - Shopping cart with checkout
- **Checkout** - Order confirmation
- **Wishlist** - Saved favorite products
- **Profile** - User account information
- **Orders** - Order history and tracking
- **Login/Register** - Authentication pages

### Admin Pages
- **Dashboard** - Analytics and statistics
- **Products** - Manage product inventory
- **Orders** - View and manage orders
- **Settings** - Admin settings

## 🔐 Features in Detail

### 🔑 Authentication
- User registration with email validation
- Secure JWT-based authentication
- Protected routes for authenticated users
- Admin-only routes for privileged operations

### 🛒 Shopping Features
- Product search and filtering
- Add to cart functionality
- Persistent cart using Context API
- Wishlist management
- Order tracking

### 📊 Admin Dashboard
- Sales analytics with charts
- Recent orders table
- Product management interface
- User statistics
- Revenue tracking

## 📦 Dependencies

### Frontend
- react: ^18.0.0
- react-dom: ^18.0.0
- typescript: ^5.0.0
- axios: ^1.0.0
- recharts: For charts and analytics
- @shadcn/ui: Component library
- tailwindcss: CSS framework

### Backend
- express: ^4.18.0
- mongoose: For MongoDB (if using MongoDB)
- jsonwebtoken: For JWT authentication
- bcryptjs: For password hashing
- cors: Cross-origin middleware

## 🚧 Development

### Code Style
- ESLint configuration is included for code quality
- TypeScript for type safety
- Consistent naming conventions

### Testing
Test files are located in `Frontend/src/test/`

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
# Build the frontend
cd Frontend
npm run build
```

### Backend Deployment (Heroku/Railway)
```bash
# Ensure all environment variables are set
# Push to your deployment platform
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Kunal Tyagi**
- GitHub: [@kunaltyagi18](https://github.com/kunaltyagi18)
- Email: your-email@example.com

## 🐛 Bug Reports

If you find a bug, please create an issue in the GitHub repository with:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

## 💡 Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Advanced search filters
- [ ] Inventory management
- [ ] User notifications
- [ ] Social media integration
- [ ] Multi-language support

## 📞 Support

For support, email kunaltyagi18@example.com or open an issue on GitHub.

---

**Happy Coding! 🚀**
