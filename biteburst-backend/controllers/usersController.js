// controllers/usersController.js
import { db } from "../db.js";
import bcrypt from "bcryptjs";

// Get all users
export const getUsers = (req, res) => {
  db.query("SELECT id, username, email FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.json(results);
  });
};

// Signup new user
export const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already registered" });
        }
        return res.status(500).json({ message: "DB error", error: err });
      }
      res.status(201).json({ message: "User created successfully", userId: result.insertId });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    if (results.length === 0) return res.status(400).json({ message: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful", userId: user.id, username: user.username });
  });
};

// Forgot password
export const forgotPassword = (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) return res.status(400).json({ message: "Email and new password required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    if (results.length === 0) return res.status(400).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email], (err2) => {
      if (err2) return res.status(500).json({ message: "DB error", error: err2 });
      res.json({ message: "Password updated successfully" });
    });
  });
};
