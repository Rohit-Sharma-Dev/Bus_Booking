const Tickets=require('../models/Ticket')


let a=["A","B","C","D"]
const row=4
let c=[]
for (var i=0;i<row;i++){
    let b=[]
    for (var j=0;j<a.length;j++){
        b.push((i+1)+""+a[j]+" ")
    }
    c.push(b)
}

let seatAvailable=(seat_no)=>{
    let ticket=await Ticket.find({busId})

    tickets=tickets.map((ticket)=>{tickets.seat_no})
}


module.exports.bookticket=async(req, res)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty){
        res.status(400).json({error:errors.array()})
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

}

