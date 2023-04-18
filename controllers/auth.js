const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* REGISTER USER */

module.exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      impressions: Math.floor(Math.random() * 10000),
      viewedProfile: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    return res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
