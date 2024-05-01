import express from "express";
import bcrypt from "bcrypt";
import { User as UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import SignUpController from "../Controllers/SignUp.js";
import LoginController from "../Controllers/Login.js";
import ForgotPassController from "../Controllers/ForgotPass.js";
import ResetPassController from "../Controllers/ResetPass.js";

export const LogoutController = async (req, res) => {
  try {
    // console.log(req.cookies);
    res.clearCookie("LoginToken");
    res.status(202).json({
      status: true,
      msg: "Logged Out successfully!",
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      msg: "Could not Loge you out!",
    });
    console.log("Error from Logout route → ", err);
  }
};
