const express=require("express")

const app=express();

const User=require("./models/user.js");

const connectDB=require("./config/database.js");


//When a client (such as a frontend or API testing tool like Postman) sends a POST request to /signup, a new user document is created and stored in the MongoDB database using Mongoose.

//Uses async function: Since saving data in MongoDB is an asynchronous operation, we use async/await.

app.post("/signup",async (req,res)=>{
    /*
        const user = new User({.......})
        Creates a new User object:
        -This initializes a new user using the Mongoose model (User).
        -The User model ensures that the document follows the structure defined in the Mongoose schema.
    
    */
    const user= new User({
        "firstName":"Harss",
        "lastName":"Awassthi",
        "gender":"male",
        "emailId":"logo@1.com",
        "age":23,
        "password":"@123@hrs",
    });

    /*
        await user.save();
        Saves the user in MongoDB:
        -user.save() is an asynchronous operation that inserts the document into the MongoDB collection.
        -await ensures that we wait for the database operation to complete before proceeding. */
    await user.save();
    res.send("account created successfully");  // Once the user is saved successfully, the server responds with "account created successfully", letting the client know that the signup process was successful.
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






