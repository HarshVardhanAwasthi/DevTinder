const express=require("express");

const profileRouter=express.Router();

const {userauth}=require("../middlewares/auth");

profileRouter.get("/profile",userauth, async (req,res)=>{
    try {
        const user=req.user;
        res.send(user);

    } catch (error) {
        res.status(400).send("ERROR: "+error.message);
    }

})

profileRouter.get("/connectionrequest",userauth,(req,res)=>{
    console.log("connection request sent...")
    const {firstName}=req.user;
    res.send(firstName+" sends the connection request");
})

module.exports=profileRouter;