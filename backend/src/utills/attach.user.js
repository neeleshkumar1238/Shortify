import { verifyToken } from "./helper.js"; 
import { findById } from "../dao/user.dao.js";

export const attachUser=async (req,res,next)=>{
    //console.log(req.cookies)
    const token = req.cookies.accessToken
    //console.log("Attach User Middleware Token:", token);
    if(!token) return next()
    try{
        const decoded = verifyToken(token)  
        const user= await findById(decoded.id)
        if(!user) return next()
        req.user=user
        next()
    } catch(err){
        next()
    }   
}