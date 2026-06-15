// controllers/ordersController.js
import { db } from "../db.js";

// Get all orders (admin view)
// Get orders (user or admin)
export const getOrders = (req, res) => {
  const { userId, admin } = req.query;

  let sql = `
    SELECT o.id, o.user_Id AS userId, o.items, o.totalAmount, o.paymentMode, o.date, u.username AS userName
    FROM checkout o
    JOIN users u ON o.user_Id = u.id
  `;

  if (!admin) {
    // normal user -> filter by userId
    if (!userId) return res.status(400).json({ message: "userId is required" });
    sql += " WHERE o.user_Id = ?";
    db.query(sql, [userId], (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      res.json(results);
    });
  } else {
    // admin -> no filter
    sql += " ORDER BY o.date DESC";
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      res.json(results);
    });
  }
};

// Create an order manually (optional, if needed for admin)
export const createOrder = (req, res) => {
  const { userId, items, totalAmount, paymentMode, address } = req.body;

  if (!userId || !items || !totalAmount || !paymentMode) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO checkout (userId, items, totalAmount, paymentMode, address, date)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;
  db.query(sql, [userId, JSON.stringify(items), totalAmount, paymentMode, address], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(201).json({ message: "Order created", orderId: result.insertId });
  });
};

// Delete a checkout/order
export const deleteCheckout = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM checkout WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if(err) return res.status(500).json({ message: "Database error", error: err });
        if(result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order removed successfully" });
    });
};
