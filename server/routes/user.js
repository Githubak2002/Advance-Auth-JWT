import express from "express";
import bcrypt from "bcrypt";
import { User as UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import SignUpController from "../Controllers/SignUp.js";
import LoginController from "../Controllers/Login.js";
import ForgotPassController from "../Controllers/ForgotPass.js";
import ResetPassController from "../Controllers/ResetPass.js";
import { LogoutController } from "../Controllers/Logout.js";

const router = express.Router();

// ===== register a new user =========
router.post("/signup", SignUpController);

// ===== login an existing user ========= JWT
router.post("/login", LoginController);

// ====== Forgot Password =========
router.post("/forgotPass", ForgotPassController);

// ====== reset Password =========
router.post("/resetPass/:token", ResetPassController);


router.get("/logout",LogoutController);

// router.get("/logout", async (req, res) => {
  
// });

export { router as UserRoute };
