# Ecomm Store

A full-featured e-commerce platform built with modern web technologies. This project provides a complete online shopping experience with product catalog, shopping cart, and secure checkout functionality.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure user registration and login system
- **Product Management**: Browse and search through product catalog
- **Shopping Cart**: Add, remove, and manage items in cart
- **Order Management**: Place orders and track order history
- **Payment Integration**: Secure payment gateway integration
- **Product Reviews**: Users can rate and review products
- **User Dashboard**: View profile, order history, and saved addresses
- **Admin Panel**: Manage products, orders, and users
- **Responsive Design**: Mobile-friendly interface
- **Search & Filter**: Advanced search and filtering options

## 🛠 Tech Stack

### Frontend
- **React** - UI library
- **Redux/Context API** - State management
- **Axios** - HTTP client
- **Tailwind CSS / Material-UI** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Stripe/Razorpay** - Payment gateway

### Tools & Services
- **Git** - Version control
- **Docker** - Containerization
- **JWT** - Secure authentication

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/kunaltyagi18/ecomm-store.git
   cd ecomm-store
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   STRIPE_API_KEY=your_stripe_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NODE_ENV=development
   ```
   
   Create a `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_STRIPE_KEY=your_stripe_publishable_key
   ```

4. **Run the application**
   
   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend:**
   ```bash
   cd frontend
   npm start
   ```

The application will be available at `http://localhost:3000`

## ⚙️ Configuration

### MongoDB Connection
Update your `MONGODB_URI` in the `.env` file with your MongoDB connection string from MongoDB Atlas or local MongoDB instance.

### Payment Gateway
Configure your Stripe or payment provider credentials in the `.env` file.

### JWT Configuration
Set a strong `JWT_SECRET` for secure token generation and validation.

## 🚀 Usage

### For Customers
1. Create an account or login
2. Browse products using search and filters
3. Add items to cart
4. Review cart and proceed to checkout
5. Enter shipping and payment information
6. Complete purchase
7. View order status in dashboard

### For Administrators
1. Login with admin credentials
2. Access admin dashboard
3. Manage products (add, edit, delete)
4. View and manage orders
5. Manage user accounts
6. View analytics and reports

## 📁 Project Structure

```
ecomm-store/
├── backend/
│   ├── models/           # Database schemas
│   ├── routes/           # API routes
│   ├── controllers/       # Business logic
│   ├── middleware/        # Authentication, validation
│   ├── config/           # Configuration files
│   └── server.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # State management
│   │   ├── utils/        # Utility functions
│   │   ├── styles/       # CSS files
│   │   └── App.js        # Main app component
│   └── public/
├── README.md
└── .gitignore
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (admin)

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart

## 💾 Database Schema

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (user/admin),
  addresses: Array,
  createdAt: Date
}
```

### Product Schema
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  rating: Number,
  reviews: Array,
  createdAt: Date
}
```

### Order Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: Array,
  totalPrice: Number,
  status: String,
  shippingAddress: Object,
  paymentMethod: String,
  createdAt: Date
}
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For questions or support, please reach out to:
- **Author**: Kunal Tyagi
- **GitHub**: [kunaltyagi18](https://github.com/kunaltyagi18)
- **Email**: your-email@example.com

## 🙏 Acknowledgments

- Thanks to all contributors who have helped with this project
- Inspired by modern e-commerce platforms
- Built with love ❤️

---

**Last Updated**: February 2026

Happy Coding! 🚀
