

import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../UserContext';

export default function AppNavBar() {

  const {user} = useContext(UserContext);

  return (
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" >
       <Container fluid>
         <Navbar.Brand id="finesse" 
         as = {NavLink} to ="/">Finesse</Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
           <Nav className="ms-auto">

           {
           (user.id === null) ?
             <>
               <Nav.Link id="nav1" as = {NavLink} to ="/login">Login</Nav.Link>
               <Nav.Link id="nav2" as = {NavLink} to ="/register">Register</Nav.Link>
             </>
            :
    
            
           (user.isAdmin === false)? 
              <>
                <Nav.Link id="nav6" as = {NavLink} to ="/storeproduct">StoreProduct</Nav.Link>
                <Nav.Link id="nav4" as = {NavLink} to ="/logout">Logout</Nav.Link> 
              </>
              :
              <>
                <Nav.Link id="nav5" as = {NavLink} to ="/dashboard">Dashboard</Nav.Link>
                <Nav.Link id="nav4" as = {NavLink} to ="/logout">Logout</Nav.Link>    
              </>
             
            }
              
                   
           </Nav>          
         </Navbar.Collapse>
       </Container>
     </Navbar>
   );
}
