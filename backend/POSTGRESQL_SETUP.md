# PostgreSQL Setup Guide

This guide provides step-by-step instructions for setting up PostgreSQL for the E-Commerce Hub backend.

## 📥 Installation

### Windows
1. Download the PostgreSQL installer from [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. Choose a password for the `postgres` superuser
4. Keep the default port (5432)
5. Select components: PostgreSQL Server, pgAdmin 4, Stack Builder
6. Complete installation

Verify installation:
```bash
psql --version
```

### macOS
Using Homebrew:
```bash
brew install postgresql@15
brew services start postgresql@15
```

Or download from [postgresql.org/download/macosx](https://www.postgresql.org/download/macosx/)

Verify installation:
```bash
psql --version
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start the service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

Verify installation:
```bash
psql --version
```

## 🗄️ Database Setup

### 1. Connect to PostgreSQL
```bash
# As default postgres user
psql -U postgres

# Or use pgAdmin GUI (comes with Windows installer)
```

### 2. Create the Database
```sql
-- Connect as postgres using psql
psql -U postgres

-- Create database
CREATE DATABASE ecomm_store;

-- List databases to verify
\l

-- Connect to the database
\c ecomm_store
```

### 3. Create a Dedicated User (Recommended)
```sql
-- Create a new user
CREATE USER ecomm_user WITH PASSWORD 'your_secure_password_here';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE ecomm_store TO ecomm_user;

-- Additional privileges for schema
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ecomm_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ecomm_user;

-- Verify user creation
\du
```

### 4. Export Connection String
Your connection string format:
```
postgresql://username:password@localhost:5432/database_name

Example:
postgresql://ecomm_user:your_password@localhost:5432/ecomm_store
```

## 🔧 Environment Configuration

### Backend .env File
Create `backend/.env`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=ecomm_user
DB_PASSWORD=your_secure_password_here
DB_NAME=ecomm_store

# OR use full connection string
# DATABASE_URL=postgresql://ecomm_user:password@localhost:5432/ecomm_store

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_should_be_long_and_random_minimum_32_characters

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## 📝 Database Tables

The application will automatically create these tables on first run:

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category VARCHAR(100),
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'Success',
  order_status VARCHAR(50) DEFAULT 'Processing',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing the Connection

### Using psql Command Line
```bash
# Connect to your database
psql -U ecomm_user -d ecomm_store -h localhost

# Test query
SELECT * FROM users;
```

### Using Node.js
```javascript
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'ecomm_user',
  password: 'your_password',
  host: 'localhost',
  port: 5432,
  database: 'ecomm_store'
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection error:', err);
  } else {
    console.log('Connected! Current time:', res.rows[0]);
  }
  pool.end();
});
```

## 🚀 Running the Application

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment
Create `.env` file with your PostgreSQL credentials (see above)

### 3. Start the Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

The server will automatically initialize database tables on first run.

## 📊 Database Management Tools

### pgAdmin (GUI)
- Installed with Windows PostgreSQL
- Access at: [http://localhost:5050](http://localhost:5050)
- Default username: postgres@pgadmin.org
- Set password during first login

### DBeaver (Alternative)
- Free desktop application
- Download: [dbeaver.io](https://dbeaver.io/)
- Create new PostgreSQL connection with your credentials

### psql (Command Line)
- Native PostgreSQL CLI tool
- Windows: `psql -U postgres`
- macOS/Linux: `psql -U postgres`

## 🔒 Security Best Practices

### 1. Use Strong Passwords
```bash
# Generate a strong password
openssl rand -base64 32
```

### 2. Never Commit .env
Your `.env` file is already in `.gitignore`, so secrets are safe.

### 3. Use Dedicated User (Not postgres)
```sql
CREATE USER app_user WITH PASSWORD 'strong_password';
GRANT CONNECT ON DATABASE ecomm_store TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_user;
```

### 4. Enable SSL in Production
```env
DB_SSL=require
```

## 🐛 Troubleshooting

### Connection Refused
```bash
# Check if PostgreSQL is running
# Windows: Services app -> PostgreSQL
# macOS: brew services list
# Linux: sudo systemctl status postgresql

# Verify default port
netstat -an | grep 5432  # Windows
lsof -i :5432  # macOS/Linux
```

### Authentication Failed
- Verify username and password
- Check that user exists: `\du` in psql
- Check user privileges: `GRANT ... TO user`

### Database Doesn't Exist
```sql
-- Create database
CREATE DATABASE ecomm_store;

-- Verify
\l
```

### Port Already in Use
Change the port in your `.env`:
```env
DB_PORT=5433
```

## 📚 Resources

- **Official Documentation**: [postgresql.org/docs](https://www.postgresql.org/docs/)
- **PostgreSQL Tutorial**: [postgresql.org/docs/current/tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- **Node.js pg Package**: [node-postgres.com](https://node-postgres.com/)
- **SQL Commands**: [postgresql.org/docs/current/sql-commands](https://www.postgresql.org/docs/current/sql-commands.html)
- **Connection String Reference**: [postgresql.org/docs/current/libpq-connect.html](https://www.postgresql.org/docs/current/libpq-connect.html)

## ✅ Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] `ecomm_store` database created
- [ ] `ecomm_user` user created with privileges
- [ ] `.env` file configured with correct credentials
- [ ] Connection tested using psql or DBeaver
- [ ] Backend server starts without connection errors
- [ ] Sample data inserted into tables
- [ ] Frontend can fetch products from API

## 📞 Need Help?

If you encounter issues:

1. Check logs: `journalctl -u postgresql` (Linux)
2. Test connection: `psql -U username -d database_name -h localhost`
3. Verify environment variables: Check `.env` file
4. Restart PostgreSQL service
5. Check PostgreSQL status in pgAdmin or Services app

---

**Last Updated**: February 12, 2026  
**PostgreSQL Version**: 12+  
**Node.js pg Version**: 8.11.3+
