const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth=require("../middleware/users")

const User = require("../models/Users");
const adminInfo=require('../controllers/users')
const locations=require('../controllers/location')


//@route  POST api/admin/
//desc    Register admin
//access  public

router.post("/admins/signUp",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "please include a valid email").isEmail(),
        check(
            "password",
            "please enter a password with 6 or more characters"
        ).isLength({ min: 6 }),
        
    ],adminInfo.signup);


//@route  POST api/admin/login
//desc    Authenticate/login user & get token
//access  public

router.post("/admin/login",
    [
        check("email", "please include a valid email").isEmail(),
        check("password", "password is required")
    ]
    ,adminInfo.login)

//@route  POST api/admins/admin/addLocation
//desc    Add locations
//access  private

router.post("/Admin/Addlocation",locations.addLocation)


module.exports = router;