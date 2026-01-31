const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const authController = require("../controller/auth.controller");
const {authMiddleware} = require("../middlewares/auth.middleware");

const router = express.Router();

//LOCAL
router.post("/register", authController.register);
router.post("/login", authController.login);

//GOOGLE
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      {
        id: user.id,
        membership_type: user.membership_type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.redirect(
      `http://localhost:5173/auth/success?token=${token}`
    );
  },
);
module.exports = router;
