const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Not able to save in db",
      });
    }
    res.json({
      name: user.name,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  console.log("reqBody", req.body);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "User email doesn't exist",
      });
    }
    console.log("user", user);
    if (user && user.password !== password) {
      return res.status(401).json({
        error: "Email and password doesn't match",
      });
    }

    if (user) {
      //create token
      const token = jwt.sign({ _id: user._id }, "secretCode");

    




      //send response to frontend
      const { _id, name, email } = user;
      return res.json({ token, user: { _id, name, email } });
    }
  });
};
