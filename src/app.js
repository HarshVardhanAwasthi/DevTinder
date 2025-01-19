const express=require("express")

const app=express();

//throw new error has been used to generate random error to understand the topic of error handling.
//one way of handling error.

app.get("/user/getdata",(req,res)=>{
    throw new Error("afjdja");
    res.send("user data send");
})

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(501).send("something went wrong");
    }
})

app.listen(7000,()=>{
    console.log("welcome to port no 7000!!")
})