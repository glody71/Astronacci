const express = require("express");
const userController = require("../controller/users.controller");

const router = express.Router();

router.put("/users/:id", userController.userChangeMembership);

module.exports = router;
