// controllers/dashboardController.js
import { db } from "../db.js";

export const getDashboardSummary = (req, res) => {
  const userQuery = "SELECT COUNT(*) AS totalUsers FROM users";
  const orderQuery = "SELECT COUNT(*) AS totalOrders, SUM(totalAmount) AS totalRevenue FROM checkout";
  const topItemsQuery = `
    SELECT JSON_UNQUOTE(JSON_EXTRACT(items, '$[*].item')) AS itemName, COUNT(*) AS count
    FROM checkout
    CROSS JOIN JSON_TABLE(items, '$[*]' COLUMNS(item VARCHAR(255) PATH '$.item')) AS t
    GROUP BY itemName
    ORDER BY count DESC
    LIMIT 5
  `;

  db.query(userQuery, (err1, users) => {
    if (err1) return res.status(500).json({ message: "Database error", error: err1 });
    db.query(orderQuery, (err2, orders) => {
      if (err2) return res.status(500).json({ message: "Database error", error: err2 });
      db.query(topItemsQuery, (err3, items) => {
        if (err3) return res.status(500).json({ message: "Database error", error: err3 });
        res.json({
          totalUsers: users[0].totalUsers,
          totalOrders: orders[0].totalOrders,
          totalRevenue: orders[0].totalRevenue || 0,
          topItems: items.map(i => i.itemName)
        });
      });
    });
  });
};
