import {useEffect, useState, useContext} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import UserContext from '../UserContext';

export default function EditProduct() {
	const {productId} = useParams();
	const {user} = useContext(UserContext);

	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_URI}/product/retrieveProduct/${productId}`).then(res => res.json()).then(data => {
				setName(data.name);
				setDescription(data.description);
				setPrice(data.price);
				setStock(data.stock); 
		})
	}, [])


	const editOneProduct = (event) => {
		event.preventDefault();

		// const {name, description, price, stock} = productData;

		fetch(`${process.env.REACT_APP_URI}/product/updateProduct/${productId}`,
		{
		method:"PUT",
		headers: {
			'Content-Type': 'application/json',
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
			navigate(`/dashboard/${productId}`);
		})
}

	return (
		<div>
			<div className="row mt-5">
				<div className="offset-lg-3 col-lg-6">
					<div className="container">
						<form onSubmit = {editOneProduct} className ="card p-3">
							<div className= "card-title">
								<h2>Edit Product</h2>
							</div>
							<div className="col-lg-12">
								<div className="form-group">
									<label>Name</label>
									<input className ="form-control"
											type="text" 
											placeholder="Name"
											value ={name}
											onChange = {event => setName(event.target.value)}
											/>
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
											/>
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
											/>
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
											/>
								</div>
							</div>

							<div className="col-lg-12 mt-3 d-flex  align-items-center">
								<Button className ="btn-success" variant="primary" type="submit">Update
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