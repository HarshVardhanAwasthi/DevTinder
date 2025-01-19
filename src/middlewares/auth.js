const adminauth=(req,res,next)=>{
    console.log("admin auth is getting checked");
    const token="xyz";
    const isAdminAuthorized=token=="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("unauthorized admin");
    }
    else{
        next();
    }
}

const userauth=(req,res,next)=>{
    const token="xyz";
    const isUserAuthorized=token=="xyyz";
    if(!isUserAuthorized){
        res.status(401).send("unauthorized User");
    }
    else{
        next();
    }
}

module.exports={
    userauth,adminauth
}