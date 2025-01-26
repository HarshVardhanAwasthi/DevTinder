const validator=require("validator");

const validatedata= (req)=>{
    const {emailId, firstName, lastName,password}=req.body;
    if (!firstName || !lastName) {
        throw new Error("Name Invalid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
        
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }
}

module.exports={
    validatedata
}