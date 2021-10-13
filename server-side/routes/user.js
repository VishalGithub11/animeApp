var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const { signin, signup } = require("../controller/auth.js");

router.post(
  "/signup",
  [
    check("name", "name should be at least of 3 Char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password filed is required").isLength({ min: 3 }),
  ],
  signin
);

module.exports = router;
