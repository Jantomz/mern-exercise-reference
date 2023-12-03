// login user controller

const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); // json web token

const createToken = (_id) => {
  // creates a jwt, nothing sensitive should go into the payload
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password); // the static method we made in the model to login  the user

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); // just sending the stuff to show it worked, browser gets a token
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user controller

const signupUser = async (req, res) => {
  const { email, password } = req.body; // destructuring the request body to get the email and password from the form that sends something in the request body

  try {
    const user = await User.signup(email, password); // the static method we made in the model to sign up the user

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); // just sending the stuff to show it worked, browser gets a token
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
