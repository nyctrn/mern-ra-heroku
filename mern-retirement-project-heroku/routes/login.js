const config = require("config");
const envSecret = config.get("JWTSECRET");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// GET
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// POST
router.post(
  "/",
  [
    check("email", "include a valid email").isEmail(),
    check("password", "pass is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: [{ msg: "wrong credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: [{ msg: "wrong credentials" }] });
      }

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
            token,
            user,
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
