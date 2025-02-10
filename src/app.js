const express=require("express")
const app=express();

const connectDB=require("./config/database.js");
const cookieParser = require("cookie-parser");

//any request that server receives first comes to main file that is app.js and then go to that express routers one by one and gives the response back once url get matched with the request url server sends the response back to client/user,
//but before going to any express router the middlewares app.use(express.json()); and app.use(cookieParser()); are applied to for parsing/fetching json file from the body of request url and cookieparser is used to read cookies that has been sent with the request, respectively , once these to middlewares are applied then request is send to the express routers..

app.use(express.json());
app.use(cookieParser());

//we are using express.Router to clean the main file and make it more readable and manage...
//Nothing changes in terms of technicality its just another and more organized and easy to manage, way of writing api(request handlers)..

const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDB().then(()=>{
    console.log("database connection established.....");
    app.listen(7000,()=>{
        console.log("welcome to port no 7000!!")
    })
})
.catch((err)=>{
    console.log("database cannot be connected!!",err)
});





