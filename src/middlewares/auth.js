const  jwt=require("jsonwebtoken");
const User=require("../models/user")
const userauth=async (req,res,next)=>{
    try
    {    
        const {token}=req.cookies;

        if(!token){
            return res.status(401).send("Please Login!!");
        }
        const decodedobj=await jwt.verify(token,"MyFirstBackendProject");

        const {_id}=decodedobj;

        const user=await User.findById(_id);

        if(!user){
            throw new Error("No user found...");
        }
        req.user=user;
        next();
    }
    catch(error)
    {
        res.status(400).send("Error:"+error.message);
    }
}
//this is authentication middleware(userauth)...
module.exports={userauth};
