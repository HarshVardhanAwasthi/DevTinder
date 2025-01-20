const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    "firstName":String,
    "lastName":String,
    "age":Number,
    "gender":String,
    "emailId":String,
    "password":String
});

const User=mongoose.model("User",userSchema);

module.exports=User;

/*  
    Schema = Defines the structure of your documents (what fields the document should have, data types, etc.).
    Model = Provides methods to interact with the MongoDB collection, like querying, updating, or inserting documents.

    This approach simplifies database operations because it abstracts away the complex query syntax of MongoDB, and you interact with it using JavaScript objects and methods provided by Mongoose.
*/

