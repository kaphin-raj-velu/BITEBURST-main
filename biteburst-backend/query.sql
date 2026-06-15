-- create database biteburst_db;
-- use biteburst_db;

-- CREATE TABLE users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(100),
--   email VARCHAR(100) UNIQUE,
--   password VARCHAR(255)
-- );

-- CREATE TABLE menu (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(100),
--   price DECIMAL(10,2),
--   category VARCHAR(50)
-- );

-- CREATE TABLE cart (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   user_id INT,
--   menu_id INT,
--   quantity INT,
--   FOREIGN KEY (user_id) REFERENCES users(id),
--   FOREIGN KEY (menu_id) REFERENCES menu(id)
-- );

-- CREATE TABLE IF NOT EXISTS feedback (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     email VARCHAR(255) NOT NULL,
--     rating INT NOT NULL,
--     comments TEXT,
--     date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- 1️⃣ Create database
/*CREATE DATABASE IF NOT EXISTS biteburst;
USE biteburst;

-- 2️⃣ Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/

-- 3️⃣ Menu table
/*CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/

-- 4️⃣ Cart table
/*CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    menu_id INT,
    restaurant VARCHAR(100),
    item VARCHAR(100),
    price DECIMAL(10,2),
    quantity INT DEFAULT 1,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
*/
-- 5️⃣ Orders table
/*CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    items JSON NOT NULL,
    total_amount DECIMAL(10,2),
    payment_method VARCHAR(50),
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);*/

-- 6️⃣ Feedback table
/*CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    rating INT NOT NULL,
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
-- 7️⃣ Optional Admin table
/*CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/

/*CREATE DATABASE IF NOT EXISTS biteburst;
USE biteburst;*/


/*CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    image VARCHAR(255)
);*/

/*INSERT INTO menu (name, price, category, image) VALUES
('Cheeseburger', 150.00, 'Burger', 'img/cheeseburger.jpg'),
('Veggie Pizza', 250.00, 'Pizza', 'img/veggie_pizza.jpg'),
('French Fries', 80.00, 'Sides', 'img/french_fries.jpg'),
('Coke', 30.00, 'Drinks', 'img/coke.jpg');
*/
/*CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    menu_id INT,
    restaurant VARCHAR(100),
    item VARCHAR(100),
    price DECIMAL(10,2),
    quantity INT DEFAULT 1,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
*/
/*select  * from menu;
update menu set image='img/haldirams.png' where id=1;*/

select * from cart;









