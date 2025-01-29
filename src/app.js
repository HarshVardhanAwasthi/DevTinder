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
        const ispass=await bcrypt.compare(password,user.password);

        if(ispass){
            const token=await jwt.sign({_id:user._id},"MyFirstBackendProject",{expiresIn:"7d"});//A token (especially JWT - JSON Web Token) is a self-contained piece of data used to verify identity and grant access to resources without requiring repeated logins.
            res.cookie("token",token,{ expires:new Date(Date.now()+100000)});//Cookies are commonly used to store the JWT token on the client side.
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





