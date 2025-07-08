import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import {Container, Button} from 'react-bootstrap'
import Cards from '../components/Cards'
import {Link} from 'react-router-dom'


export default function Dashboard(){

	const[productData, setProductData] =useState('')

	useEffect(() => {
		fetch(`${process.env.REACT_APP_URI}/product/allProducts`,{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
		.then(data=>{
			console.log(data)
			setProductData(data.map(product => {
				return (<Cards key={product._id} prop={product}/>)
			}))
		})
	}, []);



	return(
		<Container className ="text-center">
			<h2 className ="mt-3"> Product Listing </h2>
			<Button className= "btn btn-success mt-3 mb-4" as = {Link} to ="/createproduct" >Create</Button>
			{productData}
		</Container>
	)
}