import {useState, useEffect, useContext} from 'react';
import {Row} from 'react-bootstrap';
import UserContext from '../UserContext';

import {useParams, Link} from 'react-router-dom';
import {Button} from 'react-bootstrap'


export default function Cards({prop}){

	const{_id, name, description, price, stock, isActive} = prop;
	const{user} = useContext(UserContext);
	// const {productId} = useParams();

	return (
		<Row>
			<div className ="containerPL">
					<div className ="cardPL">
						<div className ="card-titlePL">
						</div>
						<div className ="card-bodyPL">
							<table className="table table-striped">
								<thead className="bg-dark text-white">
									<tr>
										<td>ID</td>
										<td>Name</td>
										<td>Description</td>
										<td>Price</td>
										<td>Stock</td>
										<td>Options</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{_id}</td>
										<td>{name}</td>
										<td>{description}</td>
										<td>{price}</td>
										<td>{stock}</td>
										<td>
											<Button className= "btn btn-danger" as = {Link} to = {`/dashboard/${_id}`}>Details</Button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
		</Row>	
		)
}



