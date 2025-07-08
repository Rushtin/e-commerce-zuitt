import {useState, useEffect} from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';

export default function CardView(){
	
	const {productId} = useParams();
	const navigate = useNavigate();

	const [_id, setId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_URI}/product/retrieveProduct/${productId}`).then(res => res.json()).then(data => {
				setId(data._id)
				setName(data.name);
				setDescription(data.description);
				setPrice(data.price);
				setStock(data.stock); 
				setIsActive(data.isActive)
		})
	}, [productId])


	function archiveProduct(){
		fetch(`${process.env.REACT_APP_URI}/product/archive/${productId}`,
		{
		method:"PATCH",
		headers: {
			'Content-Type' : 'application/json',
			Authorization : `Bearer ${localStorage.getItem('token')}`}
		}).then(res => res.json())
		.then(data => {
			alert("Successfully changed the status")
			navigate('/dashboard')
		})
	}

// 	function deleteProduct(){

// }

	return(
		  <Card>
		    <Card.Header>Latest Trend!</Card.Header>
		    <Card.Body>
		      <Card.Title>{name}</Card.Title>
		      <Card.Text>
		        {description}
		      </Card.Text>
		      <Card.Text>
		       Php {price}
		      </Card.Text>
		      <Card.Text>
		        {stock}
		      </Card.Text>

		      {
		      	(isActive) ?
		      	<Button className= "btn btn-success"  onClick = {archiveProduct} variant="danger">Archived</Button>
		      	:
		      	<Button className= "btn btn-success " onClick = {archiveProduct} variant="success">Unarchived</Button>

		      }
		      	<Button className= "btn btn-danger m-3" as = {Link} to = {`/dashboard/${productId}/editproduct`} variant="danger">Edit</Button>

		      <Button className= "btn btn-primary" as = {Link} to = {`/dashboard`} variant="primary">Back</Button>

		    </Card.Body>
		  </Card>
	)

}