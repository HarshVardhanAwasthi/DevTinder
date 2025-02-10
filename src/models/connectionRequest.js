const mongoose=require("mongoose");
const User=require("./user")
const connectionRequestSchema=new mongoose.Schema({
    "fromUserId":{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    "toUserId":{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    "status":{
        type:String,
        required:true,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{VALUE} not a valid status type`//mongoose me $ kaam nhi krta ye sirf js mein kaam krta hai mongoose {VALUE} automatic status se replace krdega (value should be in capital and it should be VALUE not VALUES)
        }
    }
})
//---------------------------------------------||||||||||||||||||||||||||||||||||||||||||||||||------------------------------------------------------

// Indexes query performance optimize karne ke liye use hote hain, taaki find, sort, filter, and aggregation fast ho sakein. MongoDB by default _id field pe ek index lagata hai.

    connectionRequestSchema.index({fromUserId:1,toUserId:1});

    /* 
       db.users.find({ firstName: "John", lastName: "Doe" }) – Fast
       db.users.find({ firstName: "John" }) – Fast
       db.users.find({ lastName: "Doe" }) – Slow (firstName required)
    */

    /*
        firstName:1 {Yeh sirf indexing order define karta hai (ascending order - 1, descending -1)}
        Index update ho raha hai" ka matlab yeh nahi ki email: 1 change ho raha hai.
        Matlab yeh hai ki naye email ko sorted order me daal diya gaya hai, isliye index update ho raha hai.  
        Agar naye document insert nahi hote, to index update nahi hoga.
        ✔ Indexes ek sorted list jaisa behave karte hain
        ✔ Har naye insert pe naye email ko sorted order me place karna padta hai, jo index update hai 🚀 */

//Jab compound index hota hai { firstName: 1, lastName: 1 }, tab index tabhi use hota hai jab query left-most field (firstName) se shuru ho.
//---------------------------------------------||||||||||||||||||||||||||||||||||||||||||||||||------------------------------------------------------

/*
    .pre() middleware request receive hote hi execute nahi hota
    ✅ Yeh tab chalta hai jab model ka save(), update(), ya remove() operation execute hota hai
    ✅ Middleware execute hone ke baad hi aage ka process (jaise save/update) continue hota hai

*/

connectionRequestSchema.pre("save"/*jo tum likhoge yahan usse pahle chalega tum save ki jagah update likhte to usse pahle chlta ye ek event listner jaisa hai */,function (next) {
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("cannot send request to self");
        
    }
    next();
})

// ---------------------------------------------||||||||||||||||||||||||||||||||||||||||||||||||-----------------------------------------------------

const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequestModel;