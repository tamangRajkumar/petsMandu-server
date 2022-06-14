import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  //   console.log("register", req.body);

  const { name, email, password } = req.body;
  if (!name) {
    return res.status(400).send("Name is required");
  }
  if (!email) {
    return res.status(400).send("Email is required");
  }
  if (!password) {
    return res.status(400).send("Password is required");
  }
  if (password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters");
  }

  const exist = await User.findOne({ email });

  if (exist) {
    return res.status(400).send("Email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    console.log("User Registerd", user);
    return res.json({
      ok: "true",
    });
  } catch (err) {
    Console.log("Sign Up Failed", err);
    return res.status(400).send(err);
  }
};

// Log In Controller
export const logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send("Email is required");
  }
  if (!password) {
    return res.status(400).send("Password is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Email not found");
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Password is incorrect");
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  user.password = undefined;
  try {
    return res.json({
      ok: "true",
      token,
      user,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
