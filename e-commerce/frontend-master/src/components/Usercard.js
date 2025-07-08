import {useEffect, useState, useContext} from 'react';
import {Container, Button, Card} from 'react-bootstrap';
import UserContext from '../UserContext'
import {useParams, Link} from 'react-router-dom';

export default function Usercard({prop}) {

  const {_id, name, description, price, stock, isActive} = prop;

  const{user} = useContext(UserContext);
  const{productId} = useParams();

  return (
    <Card className="mt-4">
      <Card.Header>Latest Trend!</Card.Header>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
         Php {price}
        </Card.Text>
        <Button className= "btn btn-primary" as = {Link} to = {`/storeproduct/${_id}`} variant="primary">View</Button>
      </Card.Body>
    </Card>
  );
}

