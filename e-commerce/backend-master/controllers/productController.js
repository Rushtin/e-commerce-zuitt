const Product = require("../models/Product");
const User = require("../models/User");

const bcrypt = require("bcrypt")
const auth = require("../auth")


addProduct = async (req, res) => {
try{
	const {name, description, price, stock} = req.body;
	const userData = auth.decode(req.headers.authorization);

	const newProduct = new Product({
		name,
		description,
		price,
		stock
	});
	

	if(userData.isAdmin){
		const checkProduct = await Product.findOne({name});
		if(checkProduct){
			// return res.status(400).json({ready: false});
			return res.send(false);
		}
		else{
			newProduct.save();
			return res.send(true)
		}
	}
	else{
		return res.send(false);
		} 
	}catch(err){
		return res.send(false);
	} 
}

allActiveProducts = async (req, res) => {
	try{
		const activeProducts = await Product.find({isActive: true});
		return res.status(200).json(activeProducts);

	}catch(err){
		return res.status(400).json({msg: err.message});
	}
}

allProducts = async (req, res) => {
	try{
		const userData = auth.decode(req.headers.authorization);

		if(userData.isAdmin){
			const allProducts = await Product.find();
			return res.status(200).json(allProducts)
		}
		else{
			return res.status(400).json({msg: "You are not an admin!"});
		}

	}catch(err){
		return res.status(400).json({msg: err})
	}
}

retrieveProduct = async (req, res) => {
	try{
		const productId = req.params.productId;
		const oneProduct = await Product.findById(productId);
		return res.json(oneProduct); 


	}catch(err){
		return res.status(400).json({msg: err.message})
	}
}

retrieveProduct2 = async (req, res) => {
	try{

		const user = auth.decode(req.headers.authorization);

		if(user){
		const productId = req.params.productId;
		const oneProduct = await Product.findById(productId);
		return res.json(oneProduct); 
		}
		else{
			return res.json(false)
		}

	}catch(err){
		return res.status(400).json({msg: err.message})
	}
}

updateProduct = async (req, res) => {
	try{
		const {name, description, price, stock} = req.body;
		const userData = auth.decode(req.headers.authorization);
		const productId = req.params.productId;

		let updatedProduct = {
			name,
			description,
			price,
			stock
		}

		if(userData.isAdmin){
			const updateOneProduct = await Product.findByIdAndUpdate(productId, updatedProduct, {new: true});
			return res.status(200).json(updateOneProduct)
			}
		else{
			return res.status(400).json({msg: "You are not an admin!"});
		}


	}catch(err){
		console.log(err)
		return res.status(400).json({msg: err.message})
	}
}

archiveProduct = async (req, res) => {
	try{
		const userData = auth.decode(req.headers.authorization);
		const productId = req.params.productId;

		if(userData.isAdmin){
			const isActiveProduct = await Product.findById(productId);
			let update = {
				isActive: !isActiveProduct.isActive
			};

			const archiveProduct = await Product.findByIdAndUpdate(productId, update, {new: true});
			return res.status(200).json(archiveProduct)
		}
		else{
			return res.status(400).json({msg: "You are not an admin"})
		}


	}catch(err){
		console.log(err)
		return res.status(400).json({msg: err.message})
	}
}

module.exports = {
	addProduct,
	allActiveProducts,
	allProducts,
	retrieveProduct,
	retrieveProduct2,
	updateProduct,
	archiveProduct
}
