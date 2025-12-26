//import { jsonwebtoken } from "jsonwebtoken";
import User from "../models/user.model.js";
import { createUser, findUserByEmail, findUserByEmailAndPassword } from "../dao/user.dao.js";
import { ConflictError } from "../utills/errorHandler.js";
import { json } from "express";
import { signToken } from "../utills/helper.js";

export const registerUser = async (name, email, password) => {
    // console.log({email});
    const user=await findUserByEmail(email);
    if(user){
        throw new ConflictError("User with this email already exists");
    }

    const newUser = await createUser(name, email, password);
    const token=await signToken({id:newUser._id});
    return {token,user:newUser};
}

export const loginUser=async(email,password)=>{
    const user=await findUserByEmailAndPassword(email);        
    
    console.log("User:", user);
    console.log("Email:", email);
    
    if(!user){
        throw new Error("Invalid credentials");
    }
    
    const isPasswordMatch=await user.comparePassword(password);
    console.log("Password match:", isPasswordMatch);
    
    if(!isPasswordMatch){
        throw new Error("Invalid credentials");
    }  
    const token=signToken({id:user._id});
    return {token,user};
}