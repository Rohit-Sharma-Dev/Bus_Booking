const express = require("express");
const router = express.Router();
const config = require("config");
// const {loginadmin}=require("../controllers/users")
const locations= require("../models/Location");

module.exports.addLocation=async(req, res)=>{
    const {city,state,stop}=req.body
    const location=new location(data)
    await location.save();
    res.json(locations.location)
}