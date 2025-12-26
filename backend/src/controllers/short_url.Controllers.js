import { getShortUrl } from "../dao/short_url.js"
import shortUrl from "../models/short_url.Model.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.Services.js"
import wrapAsync from "../utills/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req,res)=>{
    const data = req.body
    let shortUrl
    console.log(data)
    console.log(req.user)
    if(req.user){
       // console.log(data)
        shortUrl = await createShortUrlWithUser(data.url,req.user._id,data.slug)
    }
    else{
        shortUrl = await createShortUrlWithoutUser(data.url)
    }
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})

export const createShortUrlAuth = wrapAsync(async (req,res)=>{
    const {url} = req.body
    const shortUrl = await createShortUrlWithUser(url,req.user._id)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})

export const redirectFromShortUrl = wrapAsync(async (req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(!url) throw new Error("Short URL not found")
    res.redirect(url.full_url)
})

export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const {url,slug} = req.body
    console.log("here",req.user)
    const shortUrl = await createShortUrlWithUser(url,req.user._id,slug)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})