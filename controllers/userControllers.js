
 import express from "express";
import { User } from "../models/User.js";
async function getAllUsers(req, res) {
    try {
        const users = await User.find();        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }           
}

async function postUser(req, res) {
    
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }       
}

async function getUserById(req, res) {
    const { id } = req.params;                  
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }       
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAllUsers, postUser,getUserById };