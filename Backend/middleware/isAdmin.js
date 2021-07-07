const User=require("../models/Users")

module.exports=async(req, res, next)=>{
    const {email}=req.body
    const user=await User.findOne({ email })
    // console.log(user)

    if (user[0].isAdmin===true){
        console.log("Admin logged Innnnnnnnn.........");
        return next()
    }
    else{
        return res.json({msg:"you are not authorised admin...."})
    }
}