const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name:{
		type : String,
		required : [true, "Username is required"]
	},
	email : {
		type : String,
		required : [true, "Email is required"]
	},
	password : {
		type : String,
		required : [true, "Password is required"]
	},
	isAdmin : {
		type : Boolean,
		default : false
	},
	mobileNo : {
		type : String, 
		required : [true, "Mobile No is required"]
	},
	orders : [
		{
			productName: {
				type : String, 
				required : [true, "ProductName is required"]
			},
			quantity: {
				type: Number,
				required: [true, "Quantity is required"]
			},
			AddedOn : {
				type : Date,
				default : new Date()
			},
			totalAmount : {
				type: Number,
				required: [true, "TotalAmount is required"]
			}
		}
	],
})

module.exports = mongoose.model("User", userSchema);
