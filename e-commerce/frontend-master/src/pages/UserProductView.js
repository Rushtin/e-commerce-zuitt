 import {useState, useEffect} from 'react';
 import {useParams, useNavigate, Link} from 'react-router-dom';
 import {Card, Button} from 'react-bootstrap';
 import Swal from 'sweetalert2';

 export default function UserProductView(){
 	const {productId} = useParams();
    const navigate = useNavigate();




 	const [_id, setId] = useState('');
 	const [name, setName] = useState('');
 	const [description, setDescription] = useState('');
 	const [price, setPrice] = useState(0);
 	const [stock, setStock] = useState(0);

 	useEffect(() => {
 		fetch(`${process.env.REACT_APP_URI}/product/retrieveProduct/${productId}`).then(res => res.json()).then(data => {
 			console.log(`hi ${data}`)
 				setName(data._id)
 				setName(data.name);
 				setDescription(data.description);
 				setPrice(data.price);
 				setStock(data.stock); 
 		})
 	}, [productId])

    function checkOut(){
        fetch(`${process.env.REACT_APP_URI}/user/${productId}/checkOut`,{
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                Swal.fire({
                    title: "Checkout Successfully!!",
                    icon: "success",
                    text: "Enjoy our product"
                })
                navigate('/storeproduct')
            }
            else{
                Swal.fire({
                    title: "Something went wrong!",
                    icon: "error",
                    text: "Try Again Later!"
                })
                navigate('/storeproduct')
            }
        })
    }

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
 		       Stock {stock}
 		      </Card.Text>
 		      <Button className= "btn btn-success" onClick = {checkOut} variant="success">Checkout</Button>
 		      <Button className= "btn btn-primary m-3" as = {Link} to = {`/storeproduct`} variant="primary">Back</Button>
 		    </Card.Body>
 		  </Card>
 	)

 }