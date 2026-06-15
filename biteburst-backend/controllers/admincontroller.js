import { db } from "../db.js";
import bcrypt from "bcryptjs";

// Admin login
export const adminLogin = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    // Fetch the admin user
    const sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
    db.query(sql, [username], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const adminUser = results[0];

        // Check if this is admin
        if (adminUser.username !== "admin") {
            return res.status(403).json({ message: "Access denied. Not an admin." });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, adminUser.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Login successful
        res.json({ message: "Login successful", adminId: adminUser.id });
    });
};
