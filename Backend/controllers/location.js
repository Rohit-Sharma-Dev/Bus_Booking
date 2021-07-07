// const {loginadmin}=require("../controllers/users")
const locations= require("../models/Location");

module.exports.addLocation=async(req, res)=>{
    const {city,state,stop}=req.body
    const location=new locations(req.body)
    await location.save();
    res.send("location added......hurraahhh")
}