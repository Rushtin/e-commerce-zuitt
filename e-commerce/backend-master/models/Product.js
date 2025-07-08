const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name : {
		type : String,
		required : [true, "Name is required"]
	},
	description : {
		type : String,
		required : [true, "Description is required"]
	},
	price : {
		type : Number,
		required : [true, "Price is required"]
	},
	stock : {
		type: Number,
		required: [true, "Stocks is required"]
	},
	isActive : {
		type : Boolean,
		default : true
	},
	createdOn : {
		type : Date,
		default : new Date()
	},
	orders : [
		{
			userId: {
				type: String,
				required : [true, "OrderId is required"]
			},
			PurchasedOn : {
				type : Date,
				default : new Date()
			}
		}
	]
})

module.exports = mongoose.model("Product", productSchema);