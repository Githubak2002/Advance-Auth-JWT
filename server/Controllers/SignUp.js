import { User as UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt"

const SignUpController = async (req,res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: false,
        msg: "User with this Email already exists",
      });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      userName,
      email,
      password: hashPass,
    });

    await newUser.save();

    return res.status(200).json({
      status: true,
      msg: "User Registered",
      newUser,
    });
  } catch (err) {
    // console.log(`Error in signup user router - ${err}`);
    return res.status(500).json({
      status: false,
      msg: "Error in signing up ROUTE -",
      err
    });
  }
}

export default SignUpController