/**
 * User Model
 * In-memory data storage for users
 * Replace with PostgreSQL queries later
 */

// In-memory storage for users
let users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "hashed_password_123", // In real app, use bcrypt
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "hashed_password_456",
    createdAt: new Date().toISOString()
  },
];

let userCounter = users.length;

/**
 * Get all users (admin only)
 * TODO: Replace with: SELECT * FROM users;
 */
export const getAllUsers = () => {
  return users;
};

/**
 * Get user by ID
 * TODO: Replace with: SELECT * FROM users WHERE id = $1;
 */
export const getUserById = (id) => {
  return users.find(user => user.id === id);
};

/**
 * Get user by email
 * TODO: Replace with: SELECT * FROM users WHERE email = $1;
 */
export const getUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

/**
 * Create a new user
 * TODO: Replace with: INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
 */
export const createUser = (userData) => {
  const existingUser = getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const newUser = {
    id: String(++userCounter),
    name: userData.name,
    email: userData.email,
    password: userData.password, // In production, hash this with bcrypt
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  return newUser;
};

/**
 * Update user details
 * TODO: Replace with: UPDATE users SET name = $1, email = $2 WHERE id = $3;
 */
export const updateUser = (id, updateData) => {
  const user = getUserById(id);
  if (!user) return null;

  const updatedUser = { ...user, ...updateData };
  const index = users.findIndex(u => u.id === id);
  users[index] = updatedUser;
  return updatedUser;
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser
};
