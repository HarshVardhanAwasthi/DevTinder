const express=require("express")

const app=express();



app.use("/users",(req,res)=>{

})

// lagatar next next use krne ki wajah se error aa rhi hai 

app.use(
    "/hello",
    (req,res,next)=>{
        console.log("1st route handler")
        // res.send("1st response!!");
        next();
        
    },

    (req,res,next)=>{
        console.log("2nd route handler")
        // res.send("1st response!!");
        next();
        
    },
)

app.listen(7000,()=>{
    console.log("welcome to port no 7000!!")
})