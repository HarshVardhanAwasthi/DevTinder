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

const validateUpdate=(req)=>{

    const fields=req.body;

    const editAllowedFields=['firstName','lastName','age','gender','photoUrl','about'];

    const isAllowed=Object.keys(fields).every(key=>editAllowedFields.includes(key));//this is a way to check if the fields that has been passed by user are subset of the editAllowedFields(basically checking if an  array  passed by  user includes  only those fields that are defined by the server)

    return isAllowed;
}

const validatePasswordUpdate=(req)=>{
    return Object.keys(req.body).includes("password")  && Object.keys(req.body).length===1;
    
}

const isStrongPass=(req)=>{
    const pass=req.body.password
    const isPassStrong=validator.isStrongPassword(pass);
    return isPassStrong;
        
}

module.exports={
    validatedata,validateUpdate,validatePasswordUpdate,isStrongPass
}