const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const results = await db.query(
      "INSERT INTO users (name, email, password, membership_type, provider) VALUES ($1,$2,$3,'A','local') RETURNING id,name,email,membership_type",
      [name, email, hashedPassword],
    );

    res.status(201).json({
      message: "Register Success",
      user: results.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, membership_type: user.membership_type,name: user.name,
    email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login success",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
