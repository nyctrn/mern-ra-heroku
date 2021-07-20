const config = require("config");
const envSecret = config.get("JWTSECRET");
const envCode = config.get("REGISTRATIONCODE");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// POST
router.post(
  "/",
  [
    check("firstName", "firstName is required").not().isEmpty(),
    check("lastName", "lastName is required").not().isEmpty(),
    check("email", "include a valid email").isEmail(),
    check("password", "please enter a pass with 6+ chars").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { firstName, lastName, email, password, code } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: [{ msg: "user already exists" }] });
      }

      if (!code) {
        user = new User({
          firstName,
          lastName,
          email,
          password,
        });
      } else if (code === envCode) {
        user = new User({
          firstName,
          lastName,
          email,
          password,
          title: 1,
        });
      } else {
        return res.status(400).json({ msg: [{ msg: "wrong code" }] });
      }

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      user = await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        envSecret,
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            user,
            token,
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
