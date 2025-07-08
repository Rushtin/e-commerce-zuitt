const User = require("../models/User");
const Product = require("../models/Product");

const bcrypt = require("bcrypt");
const auth = require("../auth");


registerUser = async (req, res) => {
	try{
		const {name, email, password, mobileNo} = req.body;

		const newUser = new User ({
			name,
			email,
			password: bcrypt.hashSync(password, 10),
			mobileNo
		})
		let registry;
		const userEmail = await User.findOne({email});
			if(userEmail){
				return res.status(400).json({registry: false});
			}
			else{
				await newUser.save()
				return res.status(200).json({registry: true});
			}
	}catch(err){
		return res.status(400).json({msg: err.message})
	}
}

loginUser = async (req, res) => {
	try{
		const {email, password} = req.body; 

		const userData = await User.findOne({email});
			if(!userData.email){
				return res.status(400).json({msg: "Please register first"})
			}

		const userPassword = await bcrypt.compareSync(password, userData.password)
			if(userPassword){
				let token = auth.createAccessToken(userData);
				console.log(token)
				return res.status(200).json({accessToken: token})
			}
			else{
				return res.status(400).json({msg: "Incorrect password! Please try again."})
			}

	}catch(err){
		return res.status(400).json({msg: err.message})
	}
}


profileDetails = async (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	console.log(userData);

	const oneUser = await User.findById(userData.id);
	return res.status(200).json(oneUser);
}

updateRole = async (req, res) => {
	try{
		const userData = auth.decode(req.headers.authorization);
		const userId = req.params.userId;

		if(userData.isAdmin){
			const updateUser = await User.findById(userId);
			let update = {
				isAdmin: !updateUser.isAdmin
			};
			const userInfo = await User.findByIdAndUpdate(userId, update, {new: true});
			return res.status(200).json(userInfo);
		}
		else{
			return res.status(400).json({msg: "You are not an admin!"})
		}

	}catch(err){
		return res.status(400).json({msg: err.message}) 
	}
};


checkOut = async (request, response) => { 
	const userData = auth.decode(request.headers.authorization);
	const productId = request.params.productId

	if(!userData.isAdmin){

		const product = await Product.findById(productId);
		// let totalAmount = product.price * request.body.quantity;


		let user = await User.findById(userData.id).then(result => {result.orders.push({
			productName: product.name,
			quantity: 1,
			totalAmount: product.price})
			return result.save().then(document => {
				return true
			})
		}).catch(err => err)

		let putOrderId = await Product.findById(productId).then(res => {res.orders.push({
		userId: userData.id
		})
		res.stock -= 1;
		return res.save().then(success => {
			console.log(success)
			return true });
		}).catch(err => err)

		return (user && putOrderId) ? response.send(true) : response.send(false);

	}
	else{
		return response.send("You are an admin")
	}
}
 

module.exports = {
	registerUser,
	loginUser,
	profileDetails,
	updateRole, 
	checkOut
}



/*getCart = async (req, res) => {
	try{
		const userData = auth.decode(req.headers.authorization);
		const userInfo = await User.findOne({email: userData.email});

		return res.status(200).json(userInfo.cart);

	}catch(err) {
		return res.status(400).json({msg: err.message})
	}
}

addToCart = async (req, res) => {

	try {

	const userData = auth.decode(req.headers.authorization);
	const productId = req.params.productId; 
	const productInfo = await Product.findById(productId);
	const totalAmount = productInfo.price * req.body.quantity;

	const userInfo = await User.findOne({email: userData.email});

	if(!userInfo.isAdmin){
	 const cartProductId = userInfo.cart.findIndex(item => item.productId === productId); 
		if(cartProductId > -1){
			return res.status(400).json({msg: "This has been added to Cart!"})
			}
		else{
			userInfo.cart.push({
				productId: productId,
				productName: productInfo.name,
				quantity: req.body.quantity,
				totalAmount: totalAmount
				});

			userInfo.save();
				}
			return res.status(200).json(userInfo);
		}
	}catch(err){
		return res.status(400).json({msg: err.message})
	}
}

deleteCart = async (req, res) => {
	try{
		const userData = auth.decode(req.headers.authorization);
		const productId = req.params.productId; 
		
		const userInfo = await User.findOne({email: userData.email}); 
		const cartIndex = userInfo.cart.findIndex((item) => item.productId === productId);

		if(cartIndex > -1){
		 	userInfo.cart.splice(cartIndex, 1);
		}

		userInfo.save();

		return res.status(200).json({msg: "Cart deleted!"});

	}catch(err){
		return res.status(400).json({msg: err.message}); 
	}
}
*/