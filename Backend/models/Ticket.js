const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema({
	seat_no :[ {
		type:String,
		required:true
	}],
	passengers:[{
		name: {
			type:String,
			required:true
		},
		gender: {
			type:String,
			required:true
			},
		age: {
			type:Number,
			required:true
		},
	}],
	contactNo:{
		type:Number,
		required: true
	},
	journeyDate:{
		type:Date,
		required:true
	},
   userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true,
				index : true
		},
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bus',
        require: true,
    },
},    {timestamps: true})

const Tickets = mongoose.model('tickets', ticketSchema)
module.exports = Tickets