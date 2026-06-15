// controllers/checkoutController.js
import { db } from "../db.js";
import bcrypt from "bcryptjs";

// Create a checkout (place order)
export const createCheckout = async (req, res) => {
  try {
    const { userId, items, totalAmount, address, paymentMode, cardNumber, cvv } = req.body;

    if (!userId || !items || !totalAmount || !paymentMode) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let hashedCard = null;
    let hashedCVV = null;

    if (paymentMode.toLowerCase() === "card") {
      if (!cardNumber || !cvv) {
        return res.status(400).json({ message: "Card number and CVV required" });
      }
      hashedCard = await bcrypt.hash(cardNumber, 10);
      hashedCVV = await bcrypt.hash(cvv, 10);
    }

    // 🧠 Extract only the name and quantity from each item
    const simplifiedItems = items.map((item) => ({
      item: item.item,          // or item.name, depending on your field
      quantity: item.quantity,
    }));

    const sql = `
      INSERT INTO checkout 
      (user_Id, items, totalAmount, address, paymentMode, cardNumberHash, cvvHash, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    db.query(
      sql,
      [userId, JSON.stringify(simplifiedItems), totalAmount, address, paymentMode, hashedCard, hashedCVV],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        // Clear cart after checkout
        db.query("DELETE FROM cart WHERE user_Id = ?", [userId], (err2) => {
          if (err2) return res.status(500).json({ message: "Error clearing cart", error: err2 });
          res.status(201).json({ message: "Checkout successful", checkoutId: result.insertId });
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// export const createCheckout = async (req, res) => {
//   try {
//     const { userId, items, totalAmount, address, paymentMode, cardNumber, cvv } = req.body;

//     if (!userId || !items || !totalAmount || !paymentMode) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     let hashedCard = null;
//     let hashedCVV = null;

//     if (paymentMode.toLowerCase() === "card") {
//       if (!cardNumber || !cvv) {
//         return res.status(400).json({ message: "Card number and CVV required" });
//       }
//       hashedCard = await bcrypt.hash(cardNumber, 10);
//       hashedCVV = await bcrypt.hash(cvv, 10);
//     }

//     const sql = `
//       INSERT INTO checkout 
//       (user_Id, items, totalAmount, address, paymentMode, cardNumberHash, cvvHash, date)
//       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
//     `;

//     db.query(
//       sql,
//       [userId, JSON.stringify(items), totalAmount, address, paymentMode, hashedCard, hashedCVV],
//       (err, result) => {
//         if (err) return res.status(500).json({ message: "Database error", error: err });
        
//         // Clear cart after checkout
//         db.query("DELETE FROM cart WHERE user_Id = ?", [userId], (err2) => {
//           if (err2) return res.status(500).json({ message: "Error clearing cart", error: err2 });
//           res.status(201).json({ message: "Checkout successful", checkoutId: result.insertId });
//         });
//       }
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Get all checkouts for a user
export const getUserCheckouts = (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ message: "userId is required" });

  const sql = "SELECT * FROM checkout WHERE user_Id = ? ORDER BY date DESC";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json(results);
  });
};
