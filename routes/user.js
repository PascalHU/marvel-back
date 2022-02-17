const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    console.log(req.fields);
  } catch (error) {
    res.status(400).json(error.response);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const checkMailDuplicate = await User.findOne({
      email: req.fields.email,
    });
    if (!checkMailDuplicate) {
      const salt = uid2(16);
      const hash = SHA256(req.fields.password + salt).toString(encBase64);
      const newUser = new User({
        email: req.fields.email,
        account: {
          username: req.fields.username,
          token: uid2(16),
          hash: hash,
          salt: salt,
        },
      });
      await newUser.save();
      res.json(newUser);
    } else {
      res.status(400).json({ error: { message: "Duplicate email" } });
    }
  } catch (error) {
    res.status(400).json(error.response);
  }
});
module.exports = router;
