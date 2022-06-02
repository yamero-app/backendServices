const express = require("express");
const authenticateUser = require("../controller/auth2");

const router = express.Router();

router.post("/auth", authenticateUser.authenticateUser); // (This is actually /auth POST route)

module.exports = router;
