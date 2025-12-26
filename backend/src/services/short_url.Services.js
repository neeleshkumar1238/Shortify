import { generateNanoId } from "../utills/helper.js";
import urlSchema from "../models/short_url.Model.js";
import { saveShortUrl } from "../dao/short_url.js";
import { Error, get } from "mongoose";
import { getCustomShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser=async(url)=>{
    console.log("Creating short URL without user for URL:", url);
    const shortUrl=await generateNanoId(7)
    if(!shortUrl) throw new Error("Short URL not generated")
    await saveShortUrl(shortUrl,url)
    return shortUrl;
}

export const createShortUrlWithUser=async(url,userId,slug=null)=>{
    console.log("slug by neelesh kumar:", slug);
    let shortUrl;
    if(slug){
        const exist = await getCustomShortUrl(slug)
        if(exist){
            throw new Error("This custome url is already exist");
        }
        shortUrl = slug;
    } else {
        shortUrl = await generateNanoId(7)
        if(!shortUrl) throw new Error("Short URL not generated")
    }
    //console.log(userId)
    await saveShortUrl(shortUrl,url,userId)
    return shortUrl;
}