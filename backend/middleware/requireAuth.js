const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers; // the headers contains the json web token with the authorization

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    // making sure the jwt was not tampered with
    const { _id } = jwt.verify(token, process.env.SECRET); // verifies the token and returns the id of the user

    // attaching user to the request as a property for future use
    req.user = await User.findOne({ _id }).select("_id"); // adds the id to the body

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
