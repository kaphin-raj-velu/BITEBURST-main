import { db } from "../db.js";

export const getMenu = (req, res) => {
  db.query("SELECT * FROM menu", (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.json(results);
  });
};

export const addMenuItem = (req, res) => {
  const { name, price, category, image } = req.body;
  const sql = "INSERT INTO menu (name, price, category, image) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, price, category, image], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.status(201).json({ message: "Menu item added", itemId: result.insertId });
  });
};
