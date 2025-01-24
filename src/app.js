const express=require("express")

const app=express();

const User=require("./models/user.js");

const connectDB=require("./config/database.js");

app.use(express.json());
app.post("/signup",async (req,res)=>{
    
    const user= new User(req.body);
    try {
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

app.patch("/updateuser",async (req,res)=>{
    const id=req.body.userid;
    const data=req.body;
    console.log(id);
    try {
        if (id) {
            const user=await User.findByIdAndUpdate({_id:id},data,{returnDocument:'after',runValidators:true});/*shorthand for this is 
            const user=await User.findByIdAndUpdate({id,data,{returnDocument:'after'})*/
            console.log(user);
            res.send("account updated!!!");
        } else {
            res.status(404).send("user not found!!!");
        }
    } catch (error) {
        res.status(400).send("something went wrong!!");
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





