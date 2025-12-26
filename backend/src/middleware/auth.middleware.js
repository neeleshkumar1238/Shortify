import { verifyToken } from "../utills/helper.js"; 
import { findById } from "../dao/user.dao.js";

export const authMiddleware=async(req,res,next)=>{

    const token=req.cookies.accessToken;
    //console.log("Auth Middleware Token:", token);
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded=verifyToken(token);
        console.log("Decoded token:", decoded);
        const user=await findById(decoded.id); 
        console.log("User found:", !!user);
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }   
        req.user=user;
        next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized"});
    }   
}
