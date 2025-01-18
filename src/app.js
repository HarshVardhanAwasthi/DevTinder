const express=require("express")

const app=express();

/*
 No Response is Sent:

    -The server receives the request but doesn't send a response (res.send(), res.json(), or res.end() is missing).
    -The client (browser, Postman, or any HTTP client) will keep waiting until the request times out.

 Request Hangs Until Timeout:

    -Since no response is sent, the client will keep waiting indefinitely.
    -Eventually, the browser or client may timeout*/

app.use("/users",(req,res)=>{

})



app.use(
    "/hello",
    (req,res,next)=>{
        console.log("1st route handler")
        // res.send("1st response!!");
        next();
        
    },

    (req,res,next)=>{
        console.log("2nd route handler")
        // res.send("1st response!!");
        // next();
        
    },
)
/*
    2nd  middleware kisi response ko bhej nahi raha (res.send()), aur next() bhi call nahi ho raha.

    -Is wajah se request hang ho jayegi, aur client (browser/Postman) wait karta rahega.
    -Browser me loading icon ghoomta rahega aur request complete nahi hogi.
*/

app.listen(7000,()=>{
    console.log("welcome to port no 7000!!")
})