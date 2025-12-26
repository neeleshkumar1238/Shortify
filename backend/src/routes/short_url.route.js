import express from "express"
import { createCustomShortUrl, createShortUrl,createShortUrlAuth } from "../controllers/short_url.Controllers.js";
import {authMiddleware} from "../middleware/auth.middleware.js"
const router=express.Router()

router.post("/",createShortUrl)
router.post("/custom",authMiddleware,createCustomShortUrl)
export default router;