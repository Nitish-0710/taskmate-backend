import bcrypt from "bcrypt";
import User from "../models/User.js";

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = new User({ email, passwordHashed });
    await user.save();
    return res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Registration Failed" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    const isValid = await bcrypt.compare(password, user.passwordHashed);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    req.session.userId = user._id;
    res.json({
      message: "User Login Successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login Failed" });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("kanban.sid");
    res.json({ message: "Logged out successfully" });
  });
};

const me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ authenticated: false });
  }

  const user = await User.findById(req.session.userId).select("email")

  res.json({
    authenticated: true,
    user: {
      id: user._id, 
      email: user.email,
    }
  });
};



export default { register, login, logout, me };
