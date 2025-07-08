const jwt = require("jsonwebtoken");

const secret = "Capstone2_E-Commerce";

// AccessToken
module.exports.createAccessToken = (result) =>{
	// payload of the JWT 
	const data = {
		id: result._id,
		email: result.email,
		isAdmin: result.isAdmin
	}
	return jwt.sign(data, secret, {})
}

// Token Verification

module.exports.verify = (request, response, next) =>{	

	let token = request.headers.authorization;
	
	if(token !== undefined){
		token = token.slice(7, token.length);
		console.log(token);
		return jwt.verify(token, secret, (error)=>{
			if(error){
			return res.send(false);
		}
			else{
				next();
			}
		})
	}
	else{	
		return res.send(false);
	}

}


// Token decryption 
module.exports.decode = (token) =>{
	if(!token){
		return res.send(false);
	}
	else{
		token = token.slice(7, token.length);
		// verify is built in function 
		return jwt.verify(token, secret, (error,data) =>{
			if(error){
				return res.send(false);
			}
			else{
				return jwt.decode(token, {complete: true}).payload;
			}
		})
	}
} 