import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`MONGODB connected successfully !! ${conn.connection.host}`)
    }
    catch (error){
        console.log(`MONGODB connection get failed: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB