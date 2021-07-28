const Bus = require("../models/Bus");
const Tickets = require("../models/Ticket");
const { validationResult } = require("express-validator");


const bookTickets = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { seat_no, passengers, journeyDate, email, contactNo } = req.body;
  // console.log(seats_no)
  const createTicket = {
    seat_no,
    passengers,
    journeyDate,
    email,
    contactNo,
  };

    try{
      
      const bus=await Bus.findById(req.params.busId)

      // console.log(bus,"bussss")
      if(!bus){
        return res.status(400).json({msg:"not define"})
      }

      let seats=bus.seats;
      // console.log(seats,"seats")
      const allBookedSeat =await allBookedTickets(req.params.busId) 
      // console.log(allBookedSeat,"allbooked")

      // if(isOutOfRange(seat_no,seats)){
      //   return res.status(400).json({msg:"seats are not available"})
      // }
      

      let isBooked;
      console.log(allBookedSeat,"dhdjhdhhj")

      isBooked = seat_no.filter((bookedSeat) => {
        return allBookedSeat.includes(bookedSeat);
      });

      
      
   
     
      createTicket.userId = req.user.id;
      createTicket.busId = bus._id;
  
      const generateTicket = new Tickets(createTicket);
     
      await generateTicket.save();

      return res.status(200).json(generateTicket);
  
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: "server error" });
  }
};


const allBookedTickets = async (busId) => {
  let tickets = await Tickets.find({ busId });
  tickets = tickets.map((ticket) => ticket.seats_no);
  let allBookedSeats = [].concat.apply([], tickets);
  return allBookedSeats
};


const isOutOfRange = (selected_seats, seats) => {
  console.log(selected_seats,"selected seat")
  var flag = true;
  var seat=selected_seats.length
  for (let i = 0; i < seat; i++) {
    for (let j = 0; j < seat; j++) {
      if (seats[j].includes(selected_seats[i])) {
        flag = false;
        break;
      } else {
        flag = true;
      }
    }
  }
  return flag;
};



module.exports = { bookTickets};