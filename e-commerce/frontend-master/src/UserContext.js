import React from 'react'; 

	// Create a context Object 
	// A context object as the name states is a data type that can be used to store information that can be shared to other components within the app
	// The context object is a different approach to passing information between components and allows easier access between components and allows easier access by the use of prop-drilling

	// CreateContext is use to create a context in react
	const UserContext = React.createContext(); 

	// The "Provider" component allows other component to consume/ use the context object and supply the necessary inforation needed to the context Object.
	export const UserProvider = UserContext.Provider;

	export default UserContext; 

