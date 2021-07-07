const Staff=require('../models/Staff')
const {validationResult}=require('express-validator')

const addStaff =async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const {name,phone,address,isDriver}= req.body

    let staff=await Staff.findOne({phone})
    if (staff){
        return res.send("staff already exist....")
    }

    staff=new staff({
        adminId:req.user,
        name,
        phone,
        address,
        isDriver
    })
    staff.save();
    res.status(201).json({msg:"staff added successfully......congrats"})
}

module.exports=addStaff