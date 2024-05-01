import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

const router = express.Router();

// ===== register a new user =========
router.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ 
        status:false, 
        msg: "User already exists" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashPass,
    });
    await newUser.save();
    return res.status(200).json({ 
      status:true, 
      msg: "User Registered",
      newUser
    });
  } catch (err) {
    console.log(`Error in signup user - ${err}`)
  }
});

// ===== login an existing user =========  JWT remaning
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
      return res.status(404).json({ 
        status:false, 
        msg: "User NOT found/registered!" });
    }
    const validPass = await bcrypt.compare(password,user.password);
    if(!validPass){
      return res.status(404).json({ 
        status:false, 
        msg: "Incorrect Email/password" });
    }
    // await newUser.save();
    return res.status(200).json({ 
      status:true, 
      msg: "User Logged in",
    });
  } catch (err) {
    console.log(`Error in login user - ${err}`)
  }
});


export { router as UserRoute };
