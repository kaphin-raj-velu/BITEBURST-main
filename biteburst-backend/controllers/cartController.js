import { db } from "../db.js";

// Get cart items
export const getCart = (req, res) => {
  const { userId } = req.params;
  db.query("SELECT * FROM cart WHERE user_id = ?", [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.json(results);
  });
};

// Add to cart
export const addToCart = (req, res) => {
  const { userId, menuId, restaurant, item, price, quantity, image } = req.body;
  const sql = "INSERT INTO cart (user_id, menu_id, restaurant, item, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [userId, menuId, restaurant, item, price, quantity, image], (err, result) => {
    //if (err) return res.status(500).json({ message: "DB error", error: err });
    res.status(201).json({ message: "Item added to cart", cartId: result.insertId });
  });
};

// Update cart item
export const updateCartItem = (req, res) => {
  const { cartId } = req.params;
  const { quantity } = req.body;
  const sql = "UPDATE cart SET quantity = ? WHERE id = ?";
  db.query(sql, [quantity, cartId], (err) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.json({ message: "Cart item updated" });
  });
};

// Remove cart item
export const removeCartItem = (req, res) => {
  const { cartId } = req.params;
  const sql = "DELETE FROM cart WHERE id = ?";
  db.query(sql, [cartId], (err) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.json({ message: "Cart item removed" });
  });
};

// Clear cart
export const clearCart = (req, res) => {
  const { userId } = req.params;
  const sql = "DELETE FROM cart WHERE user_id = ?";
  db.query(sql, [userId], (err) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.json({ message: "Cart cleared" });
  });
};
