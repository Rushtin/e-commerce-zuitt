// import Cards from '../components/Cards'
// import coursesData from '../data/courses.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row} from 'react-bootstrap'
import {useEffect, useState} from 'react';
import Usercard from '../components/Usercard'

export default function StoreProduct(){
	const [product, setProduct] = useState([]);

	// const local = localStorage.getItem("email");

	useEffect(() =>{
		fetch(`${process.env.REACT_APP_URI}/product/allActiveProducts`).then(res => res.json())
			.then(data => {
				console.log(data);

				// Sets the "courses" state to map the data retrieved from te fetch request into several "CourseCard" Component
				setProduct(data.map((productId) => {
					return(
				<Usercard key = {productId._id} prop = {productId}/>
					)
				}))
			})
	}, [])

	return (
		// Syntax: 
			// localStorage.getItem("propertyName")

		<Container >
			<Row className = "my-3">
				{product}				
			</Row>
		</Container>
		)
}