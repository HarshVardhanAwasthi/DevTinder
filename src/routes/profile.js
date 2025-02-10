const express=require("express");
const bcrypt=require("bcrypt");
const profileRouter=express.Router();

const {userauth}=require("../middlewares/auth");
const {validateUpdate, validatePasswordUpdate, isStrongPass}=require("../utils/validation");

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

profileRouter.patch('/edit',userauth,(req,res)=>{
    try {
        if (validateUpdate(req)) {
            const user=req.user;
            const fields=req.body;

            //updating fields value this is a way in javascript to go through the fields of array one by one in js you can store keys with value in this way you can update values of each key 
            //you must have good command on javascript also.. this not a rocket science just a way to go through an each element of an array... 
            Object.keys(fields).forEach(key=>{
                user[key]=fields[key];
            })


            user.save();

            //this is an another way of sending response back to client in a json format nothing rocket science..
            res.json({
                message:`${user.firstName} has updated his profile`,
                data:user
            })
        }
        else{
            throw new Error("Invalid field to update!!");
            
        }
    } catch (error) {
        res.status(400).send("ERROR: "+error.message);
    }
})

profileRouter.patch("/password",userauth,async(req,res)=>{
    try {
        if(validatePasswordUpdate(req)){
            const user=req.user;
            if(isStrongPass(req)){

                const newpass=await bcrypt.hash(req.body.password,10);
                user.password=newpass;

                await user.save();

                res.cookie('token', null, { expires: new Date(Date.now())});
                res.send("password changed succesfully!!!  Login Again with a new Password...");
            }
            else{
                throw new Error("Enter a Strong Password!!");
                
            }
        }
        else{
            throw new Error("Not a Valid Field");
            
        }
    } catch (error) {
        res.status(400).send("ERROR: "+error.message);
    }
})

module.exports=profileRouter;