
import{useState, useEffect, useContext} from 'react';
import {Button} from 'react-bootstrap';

import {useNavigate, Link} from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function CreateProduct(){

	const history = useNavigate();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [isActive, setIsActive] = useState(false);


	const {user} = useContext(UserContext);

	useEffect(() =>{
		name !== "" && description !== "" && price !== "" && stock !== "" ? setIsActive(true) : setIsActive(false)
	}, [name, description, price, stock])


	const createProduct =  (event) =>{
		event.preventDefault();

		console.log(user)
		if(user.isAdmin){
			fetch(`${process.env.REACT_APP_URI}/product/addProduct`, 

			{
			method:"POST",
			headers: {
				'Content-Type' : 'application/json',
				Authorization : `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price,
				stock: stock
			})
		}).then(res => res.json())
	 		.then(data => { 	
	 		console.log(data)		
	 			if(data === false){
	 				Swal.fire({
	 				    title: "Product Already Exists!",
	 				    icon: "error",
	 				    text: "Create another one!"
	 				})
	 			}
	 			else{
	 				Swal.fire({
	 				    title: "Congrats!",
	 				    icon: "success",
	 				    text: "HEHEHE!"
	 				})
	 				setName('');
	 				setDescription('');
	 				setPrice(0);
	 				setStock(0);	

	 				history('/dashboard')
	 			}
	 		})

	 		}
		}


	  return(
	  	<div>
	  		<div className="row mt-5">
	  			<div className="offset-lg-3 col-lg-6">
	  				<div className="container">
	  					<form onSubmit = {createProduct} className ="card p-3">
	  						<div className= "card-title">
	  							<h2>Create Product</h2>
	  						</div>
	  						<div className="col-lg-12">
	  							<div className="form-group">
	  								<label>Name</label>
	  								<input className ="form-control"
	  										type="text" 
	  										placeholder="Name"
	  										value ={name}
	  										onChange = {event => setName(event.target.value)}
	  										required/>
	  							</div>
	  						</div>

	  						<div className="col-lg-12">
	  							<div className="form-group">
	  								<label>Description</label>
	  								<input className ="form-control"
	  										type="text" 
	  										placeholder="Description"
	  										value ={description}
	  										onChange = {event => setDescription(event.target.value)}
	  										required/>
	  							</div>
	  						</div>

	  						<div className="col-lg-12">
	  							<div className="form-group">
	  								<label>Price</label>
	  								<input className ="form-control"
	  										type="text" 
	  										placeholder="Price"
	  										value ={price}
	  										onChange = {event => setPrice(event.target.value)}
	  										required/>
	  							</div>
	  						</div>

	  						<div className="col-lg-12">
	  							<div className="form-group">
	  								<label>Stock</label>
	  								<input	className ="form-control"
	  										 type="text" 
	  										placeholder="Name"
	  										value ={stock}
	  										onChange = {event => setStock(event.target.value)}
	  										required/>
	  							</div>
	  						</div>

	  						<div className="col-lg-12 mt-3 d-flex  align-items-center">
	  							<Button className ="btn-success "variant="primary" type="submit" disabled = {!isActive}>Create
	  							</Button>

	  							<Button className= "btn primary " as = {Link} to ="/dashboard" >Back</Button>
	  						</div>

	  					</form>
	  				</div>
	  			</div>
	  		</div>
	  	</div>
	)
}