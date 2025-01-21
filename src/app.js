const express=require("express")

const app=express();

const User=require("./models/user.js");

const connectDB=require("./config/database.js");

app.use(express.json());//It is used as middleware to parse incoming JSON data from requests.
//Express does not parse request bodies. If a client sends JSON data in a POST, PUT, or PATCH request, you won’t be able to access it without express.json().
app.post("/signup",async (req,res)=>{
    
    const user= new User(req.body);
    //req.body is an object that contains data sent in the request body. It is used when a client (frontend, Postman, etc.) sends data to the server using POST, PUT, or PATCH requests.


    await user.save();
    res.send("account created successfully"); 
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






