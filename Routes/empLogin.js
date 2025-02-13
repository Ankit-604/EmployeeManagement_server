const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const empLoginModel = require("../Schema/empLogin");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await empLoginModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new empLoginModel({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(201).json({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await empLoginModel.findOne({ username: username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    {
      username: username,
      _id: user._id,
    },
    process.env.secret,
    {
      expiresIn: "10h",
    }
  );
  res.status(200).json({ message: "Login successful", token });
});

module.exports = router;
