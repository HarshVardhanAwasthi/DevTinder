const express=require("express")

const app=express();

//this is middleware which is used for authentication purpose.
//here app.use is used because it will handle all calls of "/admin" call weather it is get post delete etc.
//each call will first go through this middleware for authentication and then go to final route handler. 

app.use("/admin",(req,res,next)=>{
    const token="xyz";
    const isAdminAuthorized = token == "xxyz";
    if(!isAdminAuthorized){
        res.status(401).send("not authorized user");
    }
    else{
        next();
    }
})

//these app.get and app.delte are route handleres which will get executed once the admin is authorized and send the response back to client.
//app.get, app.post, app.delte, etc can be route handlers depending on the purpose of route handler.

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