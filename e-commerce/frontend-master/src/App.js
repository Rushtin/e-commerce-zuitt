// design
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// browser
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


// components
import AppNavBar from "./components/AppNavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';

import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import Dashboard from './pages/Dashboard';
import CardView from './pages/CardView';

import StoreProduct from './pages/StoreProduct';
import UserProductView from './pages/UserProductView'

import {UserProvider} from './UserContext';
import {useState, useEffect} from 'react';

function App() {

  const[user, setUser] = useState({id: null, isAdmin: false})

  const unSetUser = () => {
    localStorage.removeItem("token");
  } 

  useEffect (() => {
  }, [user])

  useEffect(() =>{
    fetch(`${process.env.REACT_APP_URI}/user/profile`, 
      {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }}).then(res => res.json())
        .then(data => {

      setUser({id: data._id, isAdmin: data.isAdmin});
    })
  }, [])


  return (
    // Router/BrowseRouter > Routes > Route

    <UserProvider value = {{user, setUser, unSetUser}}>
      <Router>
      <AppNavBar/>
        <Routes>
            <Route path= "/" element = {<Home/>}/>
            <Route path= "/register" element = {<Register/>}/>
            <Route path= "/createproduct" element = {<CreateProduct/>}/>
            <Route path= "/login" element = {<Login/>}/>
            <Route path= "/logout" element = {<Logout/>}/>
            <Route path= "*" element = {<Error/>}/>

            <Route path= "/dashboard" element = {<Dashboard/>}/>
            <Route path= "/dashboard/:productId" element = {<CardView/>}/>
            <Route path= "/dashboard/:productId/editproduct" element = {<EditProduct/>}/> 


            <Route path= "/storeproduct" element = {<StoreProduct/>}/>
            <Route path= "/storeproduct/:productId" element = {<UserProductView/>}/>            
        </Routes>
      </Router>
    </UserProvider>

  );
}

export default App;
