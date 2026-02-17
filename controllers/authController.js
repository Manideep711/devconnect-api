
import { hash } from "bcrypt";
import { User } from "../models/userModel.js";
import hashPassword from "../services/authServices.js";
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