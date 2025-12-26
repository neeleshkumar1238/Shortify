import User from "../models/user.model.js";
import UrlModel from "../models/short_url.Model.js";

export  const findUserByEmail=async(email)=>{
    return await User.findOne({email});
}

export  const findUserByEmailAndPassword=async(email)=>{
    return await User.findOne({email}).select('+password');
}


export const createUser=async(name,email,password)=>{
    const newUser=new User({name,email,password});
    //console.log({newUser});
    await newUser.save();
    return newUser;
} 

export const findById=async(id)=>{
    return await User.findById(id);
}

export  const getAllUserUrlsDao = async (id) => {        
    return await UrlModel.find({user:id});
}