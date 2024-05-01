import express from "express";
import bcrypt from "bcrypt";
import { User as UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import SignUpController from "../Controllers/SignUp.js";
import LoginController from "../Controllers/Login.js";

const router = express.Router();

// ===== register a new user =========
router.post("/signup", SignUpController);

// ===== login an existing user ========= JWT
router.post("/login", LoginController)

// ====== Forgot Password =========
router.post("/forgotPass", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "User not registered",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "appylohar@gmail.com",
        pass: "aqml kqzt bsmu jnnh",
      },
    });

    var mailOptions = {
      from: "appylohar@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `${process.env.BASE_URL_FRONTEND}/resetPass/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // console.log(error);
        return res
          .status(404)
          .json({ status: false, msg: "email NOT sent - ERROR" });
      } else {
        console.log("Email sent: " + info.response);
        // window.alert("Email sent");
        return res
          .status(202)
          .json({ status: true, msg: "Reset Pass email sent!" });
      }
    });
  } catch (error) {
    console.log(`Error in forgot pass route → ${error}}`);
  }
});

// ====== reset Password =========
router.post("/resetPass/:token", async (req, res) => {
  const { token } = req.params;
  const { newPass } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    console.log("Backend decoded - ".bgBlack.white, decoded);

    const hashPass = await bcrypt.hash(newPass, 10);

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { password: hashPass },
      { new: true }
    );

    if (!updatedUser) {
      console.log(`Error updating password → ${err}`);
      return res.status(404).json({
        status: false,
        msg: "Invalid token or password update failed",
      });
    }
    return res.status(202).json({
      status: true,
      msg: "Password updated!",
    });
  } catch (error) {
    console.log(`Error in reset pass route → ${error}`);
    return res.status(404).json({
      status: false,
      msg: "Invalid token",
    });
  }
});

export { router as UserRoute };
