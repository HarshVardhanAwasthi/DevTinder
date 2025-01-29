const express=require("express")
const bcrypt=require("bcrypt")
const app=express();
var jwt = require("jsonwebtoken")
const {validatedata}=require("./utils/validation.js")
const User=require("./models/user.js");

const connectDB=require("./config/database.js");
const cookieParser = require("cookie-parser");

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
            const token=await jwt.sign({_id:user._id},"MyFirstBackendProject");//A token (especially JWT - JSON Web Token) is a self-contained piece of data used to verify identity and grant access to resources without requiring repeated logins.
            res.cookie("token",token);//Cookies are commonly used to store the JWT token on the client side.
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

app.get("/profile",async (req,res)=>{
    try {
        const {token} = req.cookies
        if(!token){
            throw new Error("Invalid token..");
        }

        const decoded=await jwt.verify(token,"MyFirstBackendProject")

        const {_id}=decoded;

        const user=await User.findById(_id);
        if(user){
            res.send(user);
        }
        else{
            throw new Error("User not found...");
        }


    } catch (error) {
        res.status(400).send("ERROR: "+error.message);
    }

})

/*
    for sign up remember three steps:
    1- validation of the data--(validatedata(req))

    2- encrypt the password--  const hashpass=await bcrypt.hash(user.password,10);
                               user.password=hashpass;

    3- create new instance of the user model--(const user = new User({
                                                 firstName,lastName,emailId,password}))
*/
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

//playing with mongoose methods...

//finding element with a emailId passed by client throgh request to server

app.get("/user",async (req,res)=>{

    const userID=req.body.emailId;
    try {
        
        const user=await User.findOne({emailId:userID});
        console.log(userID);
    
        if(!user){
            res.status(404).send("user not found");
        }
        else{
            res.send(user);
        }

    } catch (error) {
        res.status(400).send("something went wrong!!");
    }
})

//finding element using id(id set by mongodb or by  you..)

app.get("/userID",async (req,res)=>{

    const userID=req.body.bhagyahanse;
    try {
        
        const user=await User.findById(userID);
        console.log(userID);
    
        if(!user){
            res.status(404).send("user not found");
        }
        else{
            res.send(user);
        }

    } catch (error) {
        res.status(400).send("something went wrong!!1");
    }
})

//finding all the elements of database...

app.get("/feed",async (req,res)=>{
    try {
        const user=await User.find({});
        if (!user) {
            res.status(404).send("no user found!!");
        } else {
            res.send(user);
        }
    } catch (error) {
        res.status(400).send("something went wrong!!");
    }
})


//deleting one element from database using a single field and its value is accessed by using (req.body.field_name)....

app.delete("/deleteuser",async(req,res)=>{
    const userId=req.body.emailId;
    try {
        if(userId){
            
            const deleted=await User.deleteOne({emailId:userId});
            res.send(deleted);

        }
        else{
            res.status(404).send("user not found!!");
        }
    } catch (error) {
        res.status(400).send("something went wrong!!!");
    }
    
})

//deleting user account from database by using userId of the user.....

app.delete("/user",async (req,res)=>{
    const userId=req.body.userid;
    try {
        if(userId){
            await User.findByIdAndDelete(userId);//shorthand for findOneAndDelete({ _id: id });
            res.send("accout deleted successfully");
        }
        else{
            res.status(404).send("user not found!!!");
        }
    } catch (error) {
        res.status(400).send("something went wrong!!");
    }
})

//updating user data by accesing it from database using id and then updating data fields requested by user to update in its account information....

app.patch("/updateuser/:_id?",async (req,res)=>{
    const id=req.params._id;
    const data=req.body;
    console.log(id);
    try {
        const allowed_Update=["skills","age","photoUrl"];//maine bana dia ek array jismein maine wo fields add krdi jo update ke lie allowed hai...

        const isAllowed=Object.keys(data).every((key)=>{
            return allowed_Update.includes(key);
        })//object.keys(data)->isne sari fields ki key values extract kr li jo body mein bheji gai hai for update
        //fir allowed_updates se match kia jo keys bheji gai hain wo updates ke lie allowed hai ki nhi
        //agr sari fields allowed hai to true return krdo wrna false
        //ye hogaya api level validation
        //JO VALIDATION MAINE SCHEMA MEIN INCLUDE KIE HAIN WO HAI SCHEMA LEVEL VALIDATION...
        if(!isAllowed){
            throw new Error("Update Not allowed...");
            
        }
        if (id) {
            const user=await User.findByIdAndUpdate({_id:id},data,{returnDocument:'after',runValidators:true});/*shorthand for this is 
            const user=await User.findByIdAndUpdate({id,data,{returnDocument:'after'})*/
            console.log(user);
            res.send("account updated!!!");
        } else {
            res.status(404).send("user not found!!!");
        }
    } catch (error) {
        res.status(400).send("Update Failed "+error.message);
    }
})

//updating user data by accesing it from database using emailId of the user and then updating data fields requested by user to update in its account information....


app.patch("/update-emailid",async (req,res)=>{
    const id=req.body.emailId;
    const data=req.body;
    console.log(id);
    try {
        if (id) {
            const user=await User.findOneAndUpdate({emailId:id},data,{returnDocument:'after',runValidators:true});
            console.log(user);
            res.send("account updated!!!");
        } else {
            res.status(404).send("user not found!!!");
        }
    } catch (error) {
        res.status(400).send("something went wrong!!");
    }
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





