const mongoose=require("mongoose");
const validator=require("validator");//we have install validator library from npm which helps in validating and sanitizing the database and also in api validation...

// ensuring that data is in a format like in email format is  ("nameofusernumber@gamil.com") mtlb kuch is tarike ka samjh jao

//Validation in Mongoose ensures that the data stored in MongoDB follows specific rules and constraints. It helps prevent invalid data from being saved.
// we can also create custom validation using validator function as used in phone number field...

const userSchema=new mongoose.Schema({
    "firstName":{type:String,required:true,minLength:3,maxLength:50},

    "lastName":{type:String,minLength:3,maxLength:50},
    
    "age":{type:Number,required:true,min:18},
    
    "gender":{type:String,required:true,validate:(value)=>{
        return ["male","female","others"].includes(value);
    }},//custom validator for gender correct value...
    
    "emailId":{type:String,required:true,lowercase:true,unique:true,trim:true,
        validate:(val)=>validator.isEmail(val),
    },
    
    "phoneNumber": { 
        type: String, required: true, 
        validate: function(value) {
                return /^[0-9]{10}$/.test(value);  // Regex for 10-digit number
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

