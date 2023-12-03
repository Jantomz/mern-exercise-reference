const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // must be unique
  },
  password: {
    type: String,
    require: true,
  },
});

// models come with static methods, but we can make our own
// so we can make a static signup method that comes with the model

// this cannot be an arrow function, since we use the "this" keyword, apparently it does not allow "this" to be called
userSchema.statics.signup = async function (email, password) {
  // using validator to prevent lots of regex checking

  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // if it is valid email, it will be true, but then the ! reverses it
  if (!validator.isEmail(email)) {
    throw Error("Email is invalid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  // I don't have the User model yet, but we want to use it to search the database, so when making a static method for a model, we can use the keyword "this" to refer to the model
  const exists = await this.findOne({ email });

  if (exists) {
    // checking if the email exists
    throw Error("Email already in use"); // we don't have access to res, so we throw an error and catch it later
  }

  // hashing password to crypt it with bcrypt

  // bcrypt forces salt, which adds a random string of characters that gets added to the users password before being hashed, the salts are different for passwords that are the same, so they get hashed differently, this prevents hackers from password matching

  const salt = await bcrypt.genSalt(10); // number of rounds, how long and how secure it is
  const hash = await bcrypt.hash(password, salt);

  // creates the user document, with the password value being the hash
  const user = await this.create({ email, password: hash });

  return user;
};

// static login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema); // calling the userSchema the "User" model
