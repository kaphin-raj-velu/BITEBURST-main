// routes/users.js
import express from "express";
import { getUsers, signupUser, loginUser, forgotPassword } from "../controllers/usersController.js";

const router = express.Router();

// Routes
router.get("/", getUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

export default router;
