const mongoose=require("mongoose");

const connectDB= async()=>{
        await mongoose.connect(
        "mongodb+srv://sdhrsss:B6YXVufW0yK3iHCH@devtinder.sb4xs.mongodb.net/devTinder"
        );
};//mongoose.connect jo hai wo promise return krega to async await ka use krke asynchronous operation ko handle kia hai..


module.exports=connectDB;