import React from 'react'
import {Navigate} from 'react-router-dom'
import {useContext, useEffect} from 'react'
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function LogOut(){
	 const {setUser, unSetUser} = useContext(UserContext);

	 unSetUser();

	 useEffect(()=> {
	 	setUser({id: null, isAdmin:false});
	 }, []);

	 Swal.fire({
	 	title: "Welcome back to the outside world!",
	 	icon: "info",
	 	text: "Come back again!"
	 });
	 
	return(
		<Navigate to = "/login"/>
		)
}