import mongoose from "mongoose";
import { User } from "./userModel.js";

const postSchema=new mongoose.Schema({
    title:String,
    content:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      required:true
    }
    },
    {
        timestamps:true
    });
export const Post = mongoose.model("Post", postSchema);