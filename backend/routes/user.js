// for user routes

// controller functions
const { loginUser, signupUser } = require("../controllers/userController");

const express = require("express");

const router = express.Router();

// login route; is post request because we will send the login data to the database

router.post("/login", loginUser);

// signup route

router.post("/signup", signupUser);

module.exports = router;
