import axios from 'axios'
import axiosInstance from '../utils/axios.instance'

export const createShortUrl=async(url,slug)=>{
    const {data}= await axiosInstance.post("/api/create",{url,slug})
    //console.log(data)
    return data.shortUrl
}