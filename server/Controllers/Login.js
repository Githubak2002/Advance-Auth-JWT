import { User as UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const LoginController = async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "User not registered",
      });
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(404).json({
        status: false,
        msg: "Email or password is incorrect",
      });
    }
    const token = jwt.sign(
      { userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // httpOnly:true - prevent the token from being accessed by client-side scripts
    // res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    res.cookie("token", token, {  maxAge: 360000 });
    return res.json({
      status: true,
      msg: "Login successfully",
    });
  } catch (error) {
    console.log(`Error in login user route → ${error}}`);
    return res.status(500).json({
      status: false,
      msg: "Internal server error",
    });
  }
}

export default LoginController