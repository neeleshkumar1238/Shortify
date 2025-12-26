import express from "express";
import {nanoid} from "nanoid";
import dotenv from "dotenv"
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/short_url.Model.js";
import short_url from "./src/routes/short_url.route.js"
 
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from "./src/controllers/short_url.Controllers.js";
import { errorHandler } from "./src/utills/errorHandler.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import { attachUser } from "./src/utills/attach.user.js";
import user_routes from "./src/routes/user.routes.js";


dotenv.config("./.env")
const app=express();


app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use(attachUser)


app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)
app.use("/api/create",short_url)

app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)

app.listen(3000,()=>{
    connectDB()
    console.log("server is running on the port http://localhost:3000");
})