import { Schema } from "mongoose";
import {user} from "./user.model.js"
import mongoose from "mongoose";
const blogschema = new Schema({
    title:{
        type:String,
        required:true
    }
    ,
    blogbody:{
        type:String,
        required:true
    }
    ,
    author:{
        type:Schema.Types.ObjectId,
        ref:"user",

    },
    coverimage:{
        type:String,
        required:false
    }

},{timestamps:true})


export const blog= mongoose.model('blog',blogschema);