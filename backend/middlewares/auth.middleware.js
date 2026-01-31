const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Ambil membership terbaru dari DB
    const result = await db.query(
      "SELECT id, name, email, membership_type FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    // Masukkan user ke req
    req.user = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      email: result.rows[0].email,
      membership_type: result.rows[0].membership_type
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
