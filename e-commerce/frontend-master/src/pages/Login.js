import{Button} from 'react-bootstrap';
import{useState, useEffect, useContext} from 'react';
import {Navigate} from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Login(){

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isActive, setIsActive] = useState(false);

	const {user, setUser} = useContext(UserContext);

	useEffect(() =>{
		email !== "" && password !== "" ?
		setIsActive(true) : setIsActive(false)

	}, [email, password])

	const authenticate = (event) =>{
		event.preventDefault();

	const userLogin = fetch(`${process.env.REACT_APP_URI}/user/login`,{
			method:"POST",
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		}).then(res => res.json())
		.then(data => {
			console.log(data);
		if(data.accessToken !== "empty"){
			localStorage.setItem('token', data.accessToken);
			retrieveUserDetails(data.accessToken);

			Swal.fire({
				title: "Login Successful",
				icon: "success",
				text: "Welcome to our website!"
			});

		}else{
			Swal.fire({
				title: "Authentication Failed",
				icon: "error",
				text: "Check your login details"
			});
			setPassword('');
		}
		})
	
	 const retrieveUserDetails = (token) => {
		const userdetails = fetch(`${process.env.REACT_APP_URI}/user/profile`, 
				{headers: {
					Authorization: `Bearer ${token}`
				}}).then(res => res.json())
				.then(data => {
					console.log(data)
					setUser({id: data._id, isAdmin: data.isAdmin});
				})

		}
	}
	return(
		(user.id !== null ) ? 
			<Navigate to = "/" />
			:
		<div className ="body1">
		<div className ="containerReg">
			<div className ="title">Login</div>
			<form onSubmit ={authenticate}>
				<div className ="user-details">
					<div className="input-box">
						<span className="details">Email</span>
						<input type="text" 
								placeholder="Enter your email"
								value ={email}
								onChange = {event => setEmail(event.target.value)}
								required/>
					</div>

					<div className="input-box">
						<span className="details">Password</span>
						<input type="password" 
								placeholder="Enter your password"
								value ={password}
								onChange = {event => setPassword(event.target.value)}
								required/>
					</div>

					<Button variant="primary" type="submit" disabled = {!isActive}>
					  Login
					</Button>

				</div>
			</form>
		</div>
		</div>
		)
}