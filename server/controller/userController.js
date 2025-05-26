const Users = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.CreateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const isUser = await Users.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({
      name,
      password: hashedPassword,
      email,
      role,
    });
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.log("create user error >>", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const isUser = await Users.findOne({ email });
    if (!isUser) {
      return res.status(404).json({ message: "Email does not exist" });
    }

    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: isUser._id, role: isUser.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "login successful", data: { user: isUser }, token });
  } catch (error) {
    console.log("login user error >>", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.GetUserList = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ message: "User list", data: users });
  } catch (error) {
    console.log("Get user list err >>", error);
    res.status(500).json({ message: "Server error", error });
  }
};
