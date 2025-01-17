const express=require("express")

const app=express();

// Routes are Matched Sequentially

// Express checks routes from top to bottom; the first match is executed.

// Specific Routes Before General Routes

//  Place specific routes (e.g., /users) before general routes (e.g., /).

// USING "USE" WILL MATCH ALL THE HTTP METHOD API CALLS TO A SPECIFIC ROUTE(eg:"/test" or "/start",etc) WETAHER IT IS A GET CALL(eg:"app.get(----)") or POST CALL(eg:"app.post(----)") or DELETE CALL(eg:"app.delete(----)")

app.use("/test", (req,res)=>{
    res.send("hello to testing phase!!")
})

app.use("/db", (req,res)=>{
    res.send("hello to dashboard!!")
})
app.use("/start",(req,res)=>{
    res.send("hello to starting the kaam!")

})

app.use("/",(req, res)=>{
    res.send("hahahahahha mai aa gaya!!")
})

app.listen(7000,()=>{
    console.log("welcome to port no 7000!!")
})