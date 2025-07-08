// setup dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import 
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");


const app = express();

// middlewares
app.use(cors());
app.use(express());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes, grabs all the routes
app.use("/user", userRoute);
app.use("/product", productRoute);


mongoose.set("strictQuery", false );

mongoose.connect("mongodb+srv://admin:admin@zuittbatch243-alberto.j1er3yl.mongodb.net/Revised-Capstone2_E-Commerce?retryWrites=true&w=majority")

// Catch an error
mongoose.connection.on("error", console.error.bind(console, "connection error"));
mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas"));

// process.env.PORT listen for request
app.listen(process.env.PORT || 4001, () =>{
	console.log(`API is now online on port ${process.env.PORT || 4001}`);
})

// app.listen(4000, ()=> {})
