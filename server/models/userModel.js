import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName:{type:String,required : true,unique:true},
    email:{type:String,required : true,unique:true},
    password:{type:String,required : true},    
  }
)

// const Model_name = mongoose.model(" collection_name ",schemaType);
const UserModel = mongoose.model("User",userSchema)
export {UserModel as User}