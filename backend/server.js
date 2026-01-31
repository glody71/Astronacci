const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");

const authRoutes = require("./routes/auth.routes")
const contentRoutes = require("./routes/content.routes")
const userRoutes = require("./routes/users.routes")

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(passport.initialize());

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api", contentRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port: ${PORT}`);
});
