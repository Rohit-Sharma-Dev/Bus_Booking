const Agency=require('../models/Agency')

const {validationResult}=require("express-validator");

const createAgency=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    const {phone,agencyName,headOfficeLocation}=req.body

    try {
        const Agency= await Agency.findOne({agencyName:agencyName})
        if (Agency){
            return res.ststus(400).json({ errors:"agency already exist"})
        }
        Agency=new agency({
            agent: req.user,
            phone,
            agencyName,
            headOfficeLocation
        })

        Agency.save()

        res.json({msg:"agency has been added....."})
    } catch (err) {
        console.error(error.msg)
    }
}