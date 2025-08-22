const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

//singnUP Logic for user details
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "All feilds are required" });

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(409).json({ message: "User already exists" });

    const hashed = await bcryptjs.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//Login logic of User

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcryptjs.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err, "error");
    return res.status(500).json({ message: "Server error" });
  }
};

//getprofile with JWT Token

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-__v -password");
    res.json(user);
  } catch (error) {
      console.error("Error in getProfile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//UPdate profile who can login with jwt token

const upadteProfie = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId,"user id")
    const { username, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, phone },
      { new: true, runValidators: true, select: "-password -__v" }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.log("Error updating profile:", error);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};


module.exports = {login, signup, getProfile, upadteProfie };
 