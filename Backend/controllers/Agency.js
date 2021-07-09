const Agency=require('../models/Agency')

const {validationResult}=require("express-validator");
module.exports.createAgency=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    const {phone,agencyName,headOfficeLocation}=req.body

    try {
        const agency= await Agency.findOne({agencyName:agencyName})
        if (Agency){
            return res.status(400).json({ errors:"agency already exist"})
        }
        agency=new Agency({
            agent: req.user,
            phone,
            agencyName,
            headOfficeLocation
        })

        await Agency.save()

        res.status(200).json({msg:"agency has been added....."})
    } catch (err) {
        console.log(err)
        res.status(400).json({msg:"not found"})
    }
}