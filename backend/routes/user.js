const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, _ } = require("../models/userModel");
const jwt = require("jsonwebtoken");
var validator = require("validator");
const AuthMiddleware = require("../middleware/authMiddleware");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//get User
router.get("/", AuthMiddleware, async (req, res) => {
  const user = await User.findById(req.id).select("-password");
  if (!user) {
    res.status(401).json({ msg: "No user found" });
  }
  res.status(201).json(user);
});
//login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({ msg: "incorrect user details" });
    return;
  }
  if (!validator.isEmail(email)) {
    res.status(401).json({ msg: "incorrect user details" });
    return;
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({ msg: "user details not found" });
      return;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ msg: "incorrect password" });
      return;
    }
    const token = createToken(user._id);
    res.status(200).json({ user, token: token });
    return;
  } catch (e) {
    res.status(401).json({ msg: "incorrect user details" });
  }
});

//signup
router.post("/signup", async (req, res) => {
  const { username, email, password1, password2 } = req.body;
  const exist = await User.findOne({ email: email });
  if (exist) {
    res.status(400).json({ msg: "user already exist" });
  }
  const salt = bcrypt.genSaltSync(10);
  if (password1 == password2) {
    try {
      const hash = bcrypt.hashSync(password1, salt);
      const newUser = await User.create({
        email: email,
        username: username,
        password: hash,
      });
      const token = createToken(newUser._id);
      res.status(201).json({
        user: newUser,
        token: token,
      });
    } catch (e) {
      res.status(400).json(e);
    }
  } else {
    res.status(400).json({ msg: "parameters are wrong" });
  }
});

module.exports = router;
