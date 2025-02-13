const express=require("express");

const userRouter=express.Router();

const {userauth}=require("../middlewares/auth");

const ConnectionRequest=require("../models/connectionRequest");
const { connection } = require("mongoose");
const User = require("../models/user");

userRouter.get("/user/requests/received",userauth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        console.log(loggedInUser);

        const requests=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        })

        if(!requests){
            return res.send("No requests");
        }

        res.json({
            message:`all the request ${loggedInUser.firstName} received:`,
            data:requests 
    })}
    catch(error){
        res.status(400).send("ERROR: "+error.message);
    }
})

userRouter.get("/user/connections",userauth,async(req,res)=>{
    try{    
        const loggedInUser=req.user

        const connections=await ConnectionRequest.find({
            $or:[
                {
                    fromUserId:loggedInUser._id,
                    status:"accepted"
                },
                {
                    toUserId:loggedInUser._id,
                    status:"accepted"
                }
            ]
        }).populate("fromUserId toUserId","firstName lastName gender age");

        let data=connections.map((rs)=>{
            if(rs.fromUserId.equals(loggedInUser._id)){
                return rs.toUserId
            }
            else if(rs.toUserId.equals(loggedInUser._id)){
                return rs.fromUserId
            }
        });

        if(!connections.length){
            res.json({
                message:`No Connections found for user ${loggedInUser.firstName}`
            })
        }

        res.json({
            message:`Connections found for user ${loggedInUser.firstName} are:`,
            data:data
        })
        

    }
    catch(error){
        res.status(400).send("ERROR: "+error.message);
    }
})

userRouter.get("/user/feed",userauth,async(req,res)=>{

    try{
        const loggedInUser=req.user;

        let limit=parseInt(req.query.limit) || 5;
        limit=limit>10? 10 : limit;

        const page=parseInt(req.query.page) || 1;

        const skip=(page-1)*limit;

        const connectionReq=await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser},
                {toUserId:loggedInUser}
            ]
        }).select("fromUserId toUserId")
        /*  
            Pagination is a technique used to divide large amounts of data into smaller, manageable chunks (pages). It is commonly used in web applications to improve performance and user experience. Instead of loading all data at once, only a subset of records is retrieved at a time.

            For example, if you have 10,000 records in a database, showing all of them at once would slow down your application. Instead, you can paginate the results by showing 10 or 20 records per page.

            1. limit – Specifies the maximum number of records to return.
            2. skip – Specifies the number of records to skip before starting to return records.
            These two parameters are commonly used in database queries (like MongoDB, SQL, etc.) and APIs to implement pagination.
        */

        
        const hideUsers=new Set();//set ek data structre hai kah skte ho jo unique values store krta hai of any type.

        connectionReq.forEach((req)=>{
        hideUsers.add(req.fromUserId.toString());
        hideUsers.add(req.toUserId.toString());
        })//this is to fetch the unique ids from connections that user had..
        

        console.log(hideUsers);
        //this feeduser is basically to create an array of users that are not linked to loggedinuser in anyway.

        //pure user database se hideusers ko substract krdo jo bacha wo feed mein daal do
        const feedUsers=await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUsers)}},//Array.from() ka use set ko array mein convert krne ke lia gaya hai kyunki mongoose set pe direct operations nhi perform kr skta hai isliye set ko pahle array mein convert kia gaya hai..
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select("firstName lastName age gender").skip(skip).limit(limit)


        // console.log(feedUsers);

        res.json({
            message:`Your Feed`,
            data:feedUsers
        })
    }
    catch(error){
        res.status(400).send("ERROR:"+error.message);
    }

})
module.exports = userRouter; 
