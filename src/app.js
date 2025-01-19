const express=require("express")

const app=express();

require("./config/database.js");// ye krne se tumne database connect kra dia with app.js

//but this is not right way to do so
/*
    -Because first you are opening ports to listen to request on server and then connecting to database, and if the website can't connect to the database, it will malfunction and likely throw errors such as database connection failures or data retrieval issues.
*/

app.listen(7000,()=>{
    console.log("welcome to port no 7000!!")
})