const express=require("express")

const app=express();


// Multiple handlers run sequentially.
// Use next() to move to the next handler.

//THE CODE BELOW GIVES ERROR BECAUSE ONCE YOU HAVE SEND RESPONSE TO THE REQUEST, THE CONNECTION BREAKS AND WHEN 2ND TIME YOU SEND RESPONSE TO THE  REQUEST IT GIVES ERROR BECAUSE IT DID NOT FIND ANY CLIENT !!!!!!

//YAHAN PE YE HO RHA HAI KI TUMNE APP.USE KIA REQUEST SERVER KE PAAS GAI USNE SEND KIA RESPONSE ("res.send("sdfkjak")") PHIR CONNECTION BREAK HO GAYA USKE BAAD JAB NEXT RUN HUA TO USNE DOOSRE REQUEST HANDLER KO BHEJ DIA LEKIN JAB WO RESPONSE SEND KREGA TO ERROR AAEGI KYUNKI CLIENT HAI NHI CONNECTION PAHLE RESPONSE KE BAAD HI KHATAM HO GAYA THA

app.use(
    "/hello",
    (req,res,next)=>{
        console.log("1st route handler")
        res.send("1st response!!");
        next();
        
    },

    (req,res)=>{
        console.log("2nd route handler")
        res.send("2nd resoponse");
    }

)

app.listen(7000,()=>{
    console.log("welcome to port no 7000!!")
})