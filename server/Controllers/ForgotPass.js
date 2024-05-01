import { User as UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const ForgotPassController = async (req,res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "User not registered",
      });
    }

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      {expiresIn: "5m",}
    );

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

}

export default ForgotPassController;