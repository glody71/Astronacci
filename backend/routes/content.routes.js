const express = require("express");
const contentController = require("../controller/content.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { checkContentLimit } = require("../middlewares/limit.middleware");
const router = express.Router();

router.get("/contents", contentController.getAllContents);
router.get(
  "/contents/:id",
  authMiddleware,
  checkContentLimit,
  contentController.getContentDetail,
);

module.exports = router;
