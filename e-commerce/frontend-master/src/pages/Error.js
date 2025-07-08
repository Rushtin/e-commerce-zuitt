import {Container, Col, Row, Button} from 'react-bootstrap';
// import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom'


export default function Error(){
	return(
		<Container>
			<Row className ="d-flex align-items-center text-center mt-4">
				<Col>
					<h2 className = "mt-5">Error 404 not found</h2>
					<p>This page does not exist</p>
					<Button as={Link} to ="/" type="submit">Go back to home page</Button>{' '}					 
				</Col>
			</Row>
		</Container>
		)
}