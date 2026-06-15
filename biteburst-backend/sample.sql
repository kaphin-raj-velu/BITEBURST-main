-- Create the database
CREATE DATABASE IF NOT EXISTS smart_food_ordering;
USE smart_food_ordering;

-- Users table: matches the frontend signup/login structure
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,           -- Unique ID for each user
    username VARCHAR(50) NOT NULL UNIQUE,             -- Used for login
    email VARCHAR(100) NOT NULL UNIQUE,               -- For signup + future password recovery
    password VARCHAR(255) NOT NULL,                   -- Hashed password (bcrypt)
    role ENUM('customer', 'admin') DEFAULT 'customer',-- Future-proof for admin panel
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP     -- When the user registered
);
