const mongoose=require("mongoose");

//Validation in Mongoose ensures that the data stored in MongoDB follows specific rules and constraints. It helps prevent invalid data from being saved.
// we can also create custom validation using validator function as used in phone number field...

const userSchema=new mongoose.Schema({
    "firstName":{type:String,required:true,minLength:3,maxLength:50},

    "lastName":{type:String,minLength:3,maxLength:50},
    
    "age":{type:Number,required:true,min:18},
    
    "gender":{type:String,required:true,enum:["male","female","others"]},
    
    "emailId":{type:String,required:true,lowercase:true,unique:true,match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/],trim:true},
    
    "phoneNumber": { 
        type: String, required: true, 
        validate: {
            validator: function(value) {
                return /^[0-9]{10}$/.test(value);  // Regex for 10-digit number
            },
        }    
    },

    "password":{type:String,required:true}
},
{
    timestamps:true,
});

const User=mongoose.model("User",userSchema);

module.exports=User;

/*  
    Schema = Defines the structure of your documents (what fields the document should have, data types, etc.).
    Model = Provides methods to interact with the MongoDB collection, like querying, updating, or inserting documents.

    This approach simplifies database operations because it abstracts away the complex query syntax of MongoDB, and you interact with it using JavaScript objects and methods provided by Mongoose.
*/

