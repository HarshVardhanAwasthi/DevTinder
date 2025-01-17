const express=require("express")

const app=express();
app.use("/test", (req,res)=>{
    res.send("hello to testing phase!!")
})

app.use("/db", (req,res)=>{
    res.send("hello to dashboard!!")
})
app.use("/start",(req,res)=>{
    res.send("hello to starting the kaam!")
})
app.listen(7000,()=>{
    console.log("welcome to port no 7000!!")
})