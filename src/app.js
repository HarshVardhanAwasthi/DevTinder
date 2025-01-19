const express=require("express")

const app=express();

const {userauth,adminauth}=require("./middlewares/auth.js");//exporting module auth.js


//autherization middleware 

app.use("/admin",adminauth) //using Commmon Js mosule for exporting and importing the modules to make code more readable and make its management more easier.

// route handler for sending response back to admin after authorization

app.get("/admin/getdata",(req,res)=>{
    console.log("admin got the data");
    res.send("data has been send");
})

app.delete("/admin/delete",(req,res)=>{
    console.log("admin wants to delete the data");
    res.send("data has been deleted");
})

app.listen(7000,()=>{
    console.log("welcome to port no 7000!!")
})