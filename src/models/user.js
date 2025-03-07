const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
const validator=require("validator");//we have install validator library from npm which helps in validating and sanitizing the database and also in api validation...

// ensuring that data is in a format like in email format is  ("nameofusernumber@gamil.com") mtlb kuch is tarike ka samjh jao

//Validation in Mongoose ensures that the data stored in MongoDB follows specific rules and constraints. It helps prevent invalid data from being saved.
// we can also create custom validation using validator function as used in phone number field...

const userSchema=new mongoose.Schema({
    "firstName":{type:String,required:true,minLength:3,maxLength:50},

    "lastName":{type:String,minLength:3,maxLength:50},
    
    "age":{type:Number,required:true,min:18},
    
    "gender":{type:String,validate:{
        validator:function (value){
        return ["male","female","others"].includes(value);
    }, message: 'Invalid Gender Type'},//custom validator for gender correct value...
    },
    
    "emailId":{type:String,required:true,lowercase:true,unique:true,trim:true,
        // validate:(val)=>validator.isEmail(val),
    },
    
    "phoneNumber": { 
        type: String,unique: true, /*validate:(val)=>validator.isMobilePhone(val),*/
    },

    "password":{type:String,required:true,
        // validate:(val)=>validator.isStrongPassword(val),
    },
    "photoUrl":{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },

    "about":{
        type:String,
        default:"About The User"
    }
},
{
    timestamps:true,
});

userSchema.methods.getJWT= async function(){
    const user=this //this refers to the document for which you are using this method...

    const token=await jwt.sign({_id:user.id},"MyFirstBackendProject",{expiresIn:"7d"});
    return token;

}

userSchema.methods.validatePassword= async function(userinputpassword){
    const user=this //this refers to the document for which you are using this method...
    const hashPassword=user.password;

    const isPasswordValidated=await bcrypt.compare(userinputpassword,hashPassword);
    return isPasswordValidated;

}

const User=mongoose.model("User",userSchema);

module.exports=User;

/*  
    Schema = Defines the structure of your documents (what fields the document should have, data types, etc.).
    Model = Provides methods to interact with the MongoDB collection, like querying, updating, or inserting documents.

    This approach simplifies database operations because it abstracts away the complex query syntax of MongoDB, and you interact with it using JavaScript objects and methods provided by Mongoose.
*/

