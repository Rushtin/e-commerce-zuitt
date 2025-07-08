import{useState, useEffect} from 'react';
import React from 'react';
import {Button} from 'react-bootstrap';

import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';





export default function Register(){

	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		name !== "" && email !== "" && mobileNo !== "" && password1 !== "" && password2 !== "" && password1 === password2
		        ? setIsActive(true)
		        : setIsActive(false)
	}, [name, email, mobileNo, password1, password2])


	function registerUser(event) {
		event.preventDefault();

	 fetch(`${process.env.REACT_APP_URI}/user/registerUser`, {
			method:"POST",
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				name: name,
                email: email,
                mobileNo: mobileNo,
                password: password1,
                password2: password2
			})
		}).then(res => res.json())
		.then(data =>{
				console.log(data)
			if(data.registry){
				Swal.fire({
				    title: "Registration Successful",
				    icon: "success",
				    text: "You may now login to the website!"
				})

				navigate('/login');
			}
			else{
				Swal.fire({
				    title: "Email Already Exists",
				    icon: "error",
				    text: "Please use another email"
				})

				setPassword1('');
				setPassword2('');
			}
		})

		
	
	}

	return(
		<div className ="body1">
		<div className ="containerReg">
			<div className ="title">Registration</div>
			<form onSubmit ={registerUser}>
				<div className ="user-details">
					<div className="input-box">
						<span className="details">Name</span>
						<input type="text" 
								placeholder="Enter your name"
								value ={name}
								onChange = {event => setName(event.target.value)}
								required/>
					</div>

					<div className="input-box">
						<span className="details">Email</span>
						<input type="text" 
								placeholder="Enter your email"
								value ={email}
								onChange = {event => setEmail(event.target.value)}
								required/>
					</div>

					<div className="input-box">
						<span className="details">MobileNo</span>
						<input type="text" 
								placeholder="Enter your mobile number"
								value ={mobileNo}
								onChange = {event => setMobileNo(event.target.value)}
								required/>
					</div>

					<div className="input-box">
						<span className="details">Password</span>
						<input type="password" 
								placeholder="Enter your password"
								value ={password1}
								onChange = {event => setPassword1(event.target.value)}
								required/>
					</div>

					<div className="input-box">
						<span className="details">Confirm Password</span>
						<input type="password" 
								placeholder="Confirm your password"
								value ={password2}
								onChange = {event => setPassword2(event.target.value)}
								required/>
					</div>

					<Button variant="primary" type="submit" disabled = {!isActive}>
					  Register
					</Button>

				</div>
			</form>
		</div>
		</div>
		)
}