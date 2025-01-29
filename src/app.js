const express=require("express")
const bcrypt=require("bcrypt")
const app=express();
var jwt = require("jsonwebtoken")
const {validatedata}=require("./utils/validation.js")
const User=require("./models/user.js");

const connectDB=require("./config/database.js");
const cookieParser = require("cookie-parser");

const {userauth}=require("./middlewares/auth.js");
app.use(express.json());
app.use(cookieParser())

app.post("/login",async (req,res)=>{
    const {emailId,password}=req.body;

    const user=await User.findOne({emailId:emailId});
    

    try{
        if(!user){
            throw new Error("Invalid Credential");
        }
        const ispass=await user.validatePassword(password);//we are using schema methods to make code more readable and encapsulate 
        
        
        //writing await is very important otherwise ispass it will not work and user can login with wrong password also ,as as you come on this function it will go there to compare and callstack mein synchronous kaam hota isko bhejdega eventloop ke paas aur aage bdh jaega jab compre hoke result milga tb tk kaam(login) ho chuka hoga...

        if(ispass){
            const token=await user.getJWT();//we are using schema methods to make code more readable and encapsulate 

            res.cookie("token",token,{ expires:new Date(Date.now()+900000)});//Cookies are commonly used to store the JWT token on the client side.
            res.send("login succesfull!!");
        }
        else{
            throw new Error("Invalid Credential");        
        }
    }
    
    catch(error){
        res.status(400).send("Error: "+error.message);
    }
})

//instead of writing authentication code in an api making tougher to read and hochpoch we have created a authentication middleware "userauth", which does the whole work of authentication this make the code more readable and easy to maintain and manage..

app.get("/profile",userauth, async (req,res)=>{
    try {
        const user=req.user;
        res.send(user);

    } catch (error) {
        res.status(400).send("ERROR: "+error.message);
    }

})


app.post("/signup",async (req,res)=>{
    
    try {
        validatedata(req);

        const {firstName,lastName,emailId,password,age,gender}=req.body;

        const hashpass=await bcrypt.hash(password,10);

        const user=new User({
            firstName,
            lastName,
            emailId,
            password:hashpass,
            age,
            gender
        })

        if (user) {
            await user.save();
            res.send("account created successfully");  
        } else {
            res.status(404).send("not a valid details")
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
    
})

app.get("/connectionrequest",userauth,(req,res)=>{
    console.log("connection request sent...")
    const {firstName}=req.user;
    res.send(firstName+" sends the connection request");
})

connectDB().then(()=>{
    console.log("database connection established.....");
    app.listen(7000,()=>{
        console.log("welcome to port no 7000!!")
    })
})
.catch((err)=>{
    console.log("database cannot be connected!!",err)
});





