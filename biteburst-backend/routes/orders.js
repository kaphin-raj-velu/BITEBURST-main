// routes/orders.js
import express from "express";
import {  getOrders, createOrder, deleteCheckout } from "../controllers/ordersController.js";
const router = express.Router();

//router.post("/", createCheckout);
router.get("/", getOrders); // Admin sees all orders
//router.post("/", createOrder); // optional manual order creation
router.delete("/:id", deleteCheckout); // <-- Delete route

export default router;
