import mongoose from "mongoose";
import crypto from "crypto"
import {createtoken} from "../service/auth.js"
import bcrypt from "bcrypt"
const userschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    salt: {
      type: String,
    //   require: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileimg: {
      type: String,
      default: "/images/nacki.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userschema.pre("save",async function (next){
    const user=this;

    // onnly hasing the a[ssword if changed or new]
    if(!user.isModified("password")) next() ;

    // const salt=crypto.randomBytes(16).toString();
    // const hashedpassword= crypto.createHmac("sha256",salt)
    // .update(user.password)
    // .digest("hex")

    // this.salt=salt;
    // this.password=hashedpassword;
    try{
    const salrounds=10;
    const plainpass=this.password;
    const hashedpassword= await bcrypt.hash(plainpass,salrounds);
    this.password=hashedpassword

    }
    catch(err){
      console.log(err.message +"in hashing ");
    }
    next();
})

// is like a fxn of userschema 
userschema.static("matchpasswordandsendtoken",async function(email,password){

    try{
    const user= await this.findOne({email:email})
    if(!user) throw new Error ("WRONG EMAIL")
// console.log(user.salt)
//     const salt=user.salt;
//      const hashedpassword= crypto.createHmac("sha256",salt)
//     .update(password)
//     .digest("hex")
const isMatch=await bcrypt.compare(password,user.password);
    // return hashedpassword===user.password;
//     console.log('user.password:', user.password, typeof user.password);
// console.log('hashedpassword:', hashedpassword, typeof hashedpassword);
if(!isMatch) return null;
 const token=createtoken(user)

 return token;

    }
    catch(Err){
      console.log(Err.message)
    }
   
})
export const user = mongoose.model("user", userschema);
