const express=require("express")
const {userauth}=require("../middlewares/auth")
const User=require("../models/user")
const ConnectionRequest=require("../models/connectionRequest")
const {ObjectId}=require("mongodb");
const { Connection } = require("mongoose");

const requestRouter=express.Router()

requestRouter.post("/request/send/:status/:toUserId",userauth,async (req,res)=>{
    try{
        const fromUserId=req.user._id;
        console.log(fromUserId);
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const userSendingReq=await User.findById(fromUserId);
        const userReceivedReq=await User.findById(toUserId);

        //---------------------------||||||||||||||||||||||||||||||||||||||||||||||------------------------------

        //checking allowed status

        const allowedStatus=['interested','ignored']

        const checkStatus=allowedStatus.includes(status)

        if(!checkStatus){
            throw new Error("Not a valid status!!!");
            
        }

        //-----------------------------|||||||||||||||||||||||||||||||||||||||||||||-----------------------------


        //checking the existence of B to whom A is sending request

        const checkToUser=await User.findById(toUserId);
        if(!checkToUser){
            throw new Error("User does not exist to whom you are sending the request!!");
            
        }

        //-----------------------------|||||||||||||||||||||||||||||||||||||||||||||-----------------------------

        //------ this  is  a validation  for if  a  has  already  send request to b then  b should not  be allowed  to send request  back to  a
        const existingConnectionRequest= await  ConnectionRequest.findOne({
            $or:[{fromUserId:toUserId, toUserId:fromUserId},
                {fromUserId,toUserId}//this is to check if A has already send request  to  B then until B's any response  to A's request a can't  send request  again  to   b...
            ] 
        })
        if(existingConnectionRequest){
            throw new Error(`you can't  send him request request`);
        }

        //-----------------------------|||||||||||||||||||||||||||||||||||||||||||||-----------------------------

        // Checking that A does not send request to itself//
        if(fromUserId.equals(toUserId)){
            console.log("findsame")
            throw new Error("You  can't  send request  to  yourself, there is no such functionality....");
        }
        
        //-----------------------------|||||||||||||||||||||||||||||||||||||||||||||-----------------------------



        console.log(`status:${status} touUserId:${toUserId}`);

        const connection=new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        await connection.save();

        res.json({
            message:`${userSendingReq.firstName} send request to ${userReceivedReq.firstName}`,
            data:connection
        })

        
    }
    catch(error){
        res.status(400).send("Error: "+error.message);
    }
})


requestRouter.post("/request/review/:status/:requestId",userauth,async (req,res)=>{
    try {

        const {status,requestId}=req.params;

        const loggedInUser=req.user;

        const allowedStatus=["accepted","rejected"];

        const checkStatus=allowedStatus.includes(status);

        if(!checkStatus){
            return res.json({
                message:`${status} is not a valid status`
            })
        }

        const connectionReq=await ConnectionRequest.findOne({
            toUserId:loggedInUser._id,
            status:"interested",
            _id:requestId
        })

        if(!connectionReq){
            return res.json({
                message:"Not Valid Request"
            })
        }
        connectionReq.status=status;

        await connectionReq.save();
        res.json({
            message:`request is ${status}`,
            data:connectionReq
        })

    } catch (error) {
        res.status(400).send("ERROR:"+error.message);
    }
})
module.exports=requestRouter