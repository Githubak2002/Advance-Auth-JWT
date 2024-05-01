import bcrypt from "bcrypt";
import { User as UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";


const ResetPassController = async (req,res) => {
  const { token } = req.params;
  const { newPass } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    // console.log("Backend decoded - ".bgBlack.white, decoded);

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

}

export default ResetPassController