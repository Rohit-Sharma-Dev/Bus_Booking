const Bus = require('../models/Bus');
const Dummybus = require('../models/Dummybus');
const User = require('../models/Users');
const Staff = require('../models/Staff');
const location = require('../models/Location');
const Agency=require('../models/Agency')
const { validationResult } = require('express-validator');

const staffSearch = (phone) => {
  return new Promise((res, rej) => {
    let staff = Staff.findOne({ phone });
    if (staff) {
      res(staff);
    }
  });
};


const generateseat=(seats)=>{
  let bus_size = [];
  let code = ["A", "B", "C", "D"];
  for (let i = 1; i <=seats; i++) {
    let b = [];
    for (let j = 1; j <= 4; j++) {
      b.push(i + code[j-1]);
    }
    bus_size.push(b);
  }
  return bus_size;
}


module.exports.createBus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ msg:"checking...."});
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
    fare,
    arrivalTime,
    departureTime
  } = req.body;
  let {driver, helper}=req.body;

  let busDetails = {
    busName,
    vehicleNo,
    policy,
    images,
    fare,
    arrivalTime,
    departureTime,
  };

  if (seatCategory) busDetails.seatCategory = seatCategory;
  if (busType) busDetails.busType = busType;

  try {
    let agencyProfile = await Agency.findOne({ agent: req.user.id });
    if(agencyProfile){
      let bus=await Bus.findOne({vehicleNo})
        if(bus){
          res.status(400).json({msg:"bus already exist"})
        }
      busDetails.agency=agencyProfile._id
      busDetails.seats=generateseat(seats)
      console.log(generateseat(seats))
      let fromLocation=await location.findOne({"city":from})
      let toLocation=await location.findOne({"city":to})
      if (!toLocation || !fromLocation) {
        return res.status(404).json({ msg: "No such location found" });
      }

      busDetails['driver']= driver;
      busDetails['helper'] = helper;
      busDetails.from = fromLocation._id;
      busDetails.to = toLocation._id;
      console.log("jklmno")
      
      if (bus) {
        bus = await Bus.findOneAndUpdate(
          { vehicleNo },
          { $set: busDetails },
          { new: true }
        );
        return res.status(200).json(bus);
      }

      // if (id) busDetails._id = id;

      bus = new Bus(busDetails);

      console.log("done successfully");
      await bus.save();
      res.status(200).json(bus);

    } else {
      return res.status(400).json({ msg: "No agency found of current admin" });
    }}
    catch (err) {
      console.log(err)
      res.status(500).json({msg:"server error"})
  }
};



// module.exports.createBus = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ msg:"checking...."});
//   }
//   const {
//     busName,
//     vehicleNo,
//     seats,
//     busType,
//     seatCategory,
//     policy,
//     images,
//     from,
//     to,
//     fare,
//     arrivalTime,
//     departureTime,driver, helper
//   } = req.body;
 

//   let busDetails = {
//     busName,
//     vehicleNo,
//     busType,
//     seatCategory,
//     policy,
//     images,
//     from,
//     to,
//     fare,
//     arrivalTime,
//     departureTime,driver, helper
//   };


  
//   try {
//     if(from === to){
//       res.status(400).json({msg:"source and destination can't be same"})
//     }
//     busDetails.seats=generateseat(seats)

//     let bus = new Dummybus(busDetails);

//       console.log("done successfully");
//       await bus.save();
//       res.status(200).json(bus);
//   }
//     catch (err) {
//       console.log(err)
//       res.status(500).json({msg:"server error"})
//   }
// };





module.exports.getBus=async(req, res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    res.status(400).json({errors:errors.array()})
  }
  let {from ,to,date}=req.body
   try {
     from =await location.findOne({"city":from})
     to=await location.findOne({"city":to})
    
     if (!from || !to) {
      return res.status(400).json({msg:"location not found"});
    }

    let buses = await Bus.find({
      $and: [{ to:to }, { from: from }],
    }).populate("from",["city","state"]).populate("to",["city","state"])
    if (!buses) {
      return res.status(400).json([]);
    }
    return res.status(200).json(buses);
   } catch (err) {
     console.log(err)
     res.status(500).json({msg:"not found"})
   }
}
