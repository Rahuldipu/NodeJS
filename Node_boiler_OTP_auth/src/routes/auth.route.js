const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");
const {
    fetchCurrentUser,
    validatePhoneNumber,
    verifyPhoneOtp,
    handleAdmin,
    refreshToken,
    registerUser,
} = require("../controllers/auth.controller");

router.post("/validatePhoneNumber", validatePhoneNumber);

router.post("/verifyOTP", verifyPhoneOtp);

router.post("/refreshToken", refreshToken);

router.get("/me", checkAuth, fetchCurrentUser);

router.post("/register", checkAuth, registerUser);

router.get("/admin", checkAuth, checkAdmin, handleAdmin);

module.exports = router;
