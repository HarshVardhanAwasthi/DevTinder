const express=require("express")
const app=express();

const connectDB=require("./config/database.js");
const cookieParser = require("cookie-parser");

const http=require("http");

const  cors=require("cors");
//any request that server receives first comes to main file that is app.js and then go to that express routers one by one and gives the response back once url get matched with the request url server sends the response back to client/user,
//but before going to any express router the middlewares app.use(express.json()); and app.use(cookieParser()); are applied to for parsing/fetching json file from the body of request url and cookieparser is used to read cookies that has been sent with the request, respectively , once these to middlewares are applied then request is send to the express routers..

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());

//we are using express.Router to clean the main file and make it more readable and manage...
//Nothing changes in terms of technicality its just another and more organized and easy to manage, way of writing api(request handlers)..

const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");
const userRouter=require("./routes/user.js");
const initializeSocket = require("./utils/socket.js");
const chatRouter  = require("./routes/chat.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",chatRouter);


const server=http.createServer(app);

initializeSocket(server)


connectDB().then(()=>{
    console.log("database connection established.....");
    server.listen(7000,()=>{
        console.log("welcome to port no 7000!!")
    })
})
.catch((err)=>{
    console.log("database cannot be connected!!",err)
});





