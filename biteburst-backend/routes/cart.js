import express from "express";
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from "../controllers/cartController.js";

const router = express.Router();

// Cart routes
router.get("/:userId", getCart);
router.post("/", addToCart);
router.put("/:cartId", updateCartItem);
router.delete("/:cartId", removeCartItem);
router.delete("/clear/:userId", clearCart);

export default router;
