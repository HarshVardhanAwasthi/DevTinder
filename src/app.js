const express=require("express")

const app=express();

app.get("/user",(req, res)=>{
    res.send({
        "first name":"Harss",
        "last name":"Awassthi"
    })
});

app.post("/user",(req, res)=>{
    console.log("save data to database");
    res.send("data saved on server");
});

//Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

// USERID AND BOOK PARAMS 

app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
  })

//  FROM TO PARAMS

app.get('/flights/:from-:to', (req, res) => {
    console.log(req.params);
    res.send(req.params);
  })

// USERNAME AND PASSWORD PARAMS

app.get('/username/:username/password/:passkey', (req, res) => {
    console.log(req.params);
    res.send(req.params);
  })
// app.use("/",(req, res)=>{
//     res.send("hahahahahha mai aa gaya!!")
// })

app.listen(7000,()=>{
    console.log("welcome to port no 7000!!")
})