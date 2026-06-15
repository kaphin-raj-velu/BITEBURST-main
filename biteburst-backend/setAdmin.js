import mysql from "mysql2";
import bcrypt from "bcryptjs";

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kaphin2007",
  database: "biteburst"
});

const username = "admin";
const plainPassword = "admin123"; // choose your password
const email="admin@biteburst.com";

// Hash the password
bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
  if (err) throw err;

  const sql = `
    INSERT INTO users (username, email, password) 
    VALUES (?, ?,?) 
    ON DUPLICATE KEY UPDATE password = ?`;

  db.query(sql, [username, email, hashedPassword, hashedPassword], (err, result) => {
    if (err) throw err;
    console.log("Admin user created/updated successfully!");
    db.end();
  });
});
