const express = require("express");
const router = express.Router();


const { signup, login, updateDetails } = require("../controllers/Auth");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.post("/signup", signup);
router.post("/login", login);
router.put("/update", authMiddleware , updateDetails);


module.exports = router;
