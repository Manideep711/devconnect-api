
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import hashPassword from "../services/authServices.js";
import jwt from "jsonwebtoken";
export async function registerUser(req,res){
    const {name,email,password}=req.body;
    if(!name || !email || ! password){
        res.status(404).send("fields are empty")
    }
    try {
        const newUser=new User({
            name,email,password:await hashPassword(password)
        });
       const user= await newUser.save();
       res.status(200).json(user)
    } catch (error) {
        res.status(404).send(error.message);
    }
}

export async function loginUser(req,res){
    const {email,password}=req.body;
        if(!email || ! password){   
        res.status(404).send("fields are empty")
    }
    const user= await User.findOne({email});
        if(!user){  
        res.status(404).send("user not found")
    }
        const isPasswordValid= await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            res.status(404).send("invalid password")
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({token});  
}