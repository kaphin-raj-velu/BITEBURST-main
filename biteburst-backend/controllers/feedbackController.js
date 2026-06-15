// controllers/feedbackController.js
import { db } from "../db.js";

// Submit feedback
export const submitFeedback = (req, res) => {
  console.log("SubmitFeedback route hit!", req.body);

  const { email, rating, comments } = req.body;

  if (!email || !rating) {
    return res.status(400).json({ message: "Email and rating required" });
  }

  const sql = "INSERT INTO feedback (email, rating, comments, date) VALUES (?, ?, ?, NOW())";
  db.query(sql, [email, rating, comments || ""], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(201).json({ message: "Feedback submitted successfully", feedbackId: result.insertId });
  });
};

// Get all feedbacks
export const getAllFeedback = (req, res) => {
  const sql = "SELECT * FROM feedback ORDER BY date DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(results);
  });
};
