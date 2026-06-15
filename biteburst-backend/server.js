import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { db } from "./db.js";

import userRoutes from "./routes/users.js";
import menuRoutes from "./routes/menu.js";
import cartRoutes from "./routes/cart.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import ordersRoutes from "./routes/orders.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import adminRoutes from "./routes/admin.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
