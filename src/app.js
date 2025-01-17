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

app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
  })

  app.get('/flights/:from-:to', (req, res) => {
    console.log(req.params);
    res.send(req.params);
  })

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