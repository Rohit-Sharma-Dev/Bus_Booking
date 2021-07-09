const Bus=require('../models/Bus')
const User=require('../models/Users')
const Staff=require('../models/Staff')
const Location=require('../models/Location')
const {validationResult}=require("express-validator");
// const seats=require('./seatCreate')

const staffSearch = (phone) => {
    return new Promise((res, rej) => {
      let staff = Staff.findOne({ phone });
      if (staff) {
        res(staff);
      }
    });
  };


const bus_size=["A","B","C","D"]
const row=4
let c=[]
for (var i=0;i<row;i++){
    let b=[]
    for (var j=0;j<4;j++){
        b.push((i+1)+""+bus_size[j]+" ")
    }
    c.push(b)
}
console.log(c)

const createBus=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        busName,
        vehicleNo,
        seats,
        busType,
        seatCategory,
        policy,
        images,
        from,
        to,
        arrivalTime,
        departureTime,
      } = req.body;
    
    let { driver, helper } = req.body;
    let busDetails = {
        busName,
        vehicleNo,
        policy,
        images,
        arrivalTime,
        departureTime,
      };

    
    const Bus=await Bus.findOne({vehicleNo})
    if(Boolean(Bus)){
        res.json({msg:"no you can't add this bus....."})
    }

    const Driver =await staffSearch(driver)
    if(!driver.isDriver){
        res.json({msg:"driver not found....."})
    }

    const Helper=await staffSearch(helper)
    if(helper.isDriver){
        res.json({msg:"helper not found...."})
    }

    const fromLocation=await location.findOne({from})
    if (!fromLocation){
        res.send("no this location doesn't exist")
    }

    const toLocation=await location.findOne({to})
    if(!toLocation){
        res.send("no such destination location found")
    }

    Bus.seats = bus_size;
    Bus.busStaff = staffs;
    Bus.from = fromlocation;
    Bus.to = tolocation;

    BUs.save()

    return res.json({msg:"added bus successfully......"})
}

module.exports=createBus