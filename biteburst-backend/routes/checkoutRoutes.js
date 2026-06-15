// routes/checkoutRoutes.js
import express from "express";
import { createCheckout, getUserCheckouts } from "../controllers/checkoutController.js";

const router = express.Router();
router.post("/", createCheckout);
router.get("/", getUserCheckouts);

export default router;
