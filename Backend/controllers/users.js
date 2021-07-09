const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/Users");

module.exports.signup=async(req,res)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log(req)
        const { name, email, password,isAdmin} = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User Already Exists" }] });
            }
            user = new User({
                name,
                email,
                password,
                isAdmin
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };
            console.log(payload,"reoejwojeow")
            const token = getSignedJwtToken(payload)
            res.status(200).json({token})
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({msg:"server error"});
        }

}



const getSignedJwtToken = function (payload,secret = config.get("jwtsecret"), 
expiresIn = 6000) {
    return jwt.sign(payload, secret, {expiresIn});
}  


module.exports.login =async(req, res)=>{
    
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password} = req.body;
        
        try {
            let user =await User.findOne({ email}) ;
            console.log(user,"ajaasassss")

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(password,user.password,isMatch,"nmmanamnam")
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] 
                });
            }
            
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const token = getSignedJwtToken(payload)

            return res.status(200).json({token})
        } catch (err) {
            console.log(err,"rojrireijpqjpiojeiojeoiejioj")
            res.status(500).json({msg:"server error"});
        }
    
}

