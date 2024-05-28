import express from "express";

// Import all the dependencies
const exampleRoute = express.Router();

// Define a route
exampleRoute.get('/', (req, res) => {
    res.send('This is the example route'); // This will get executed when user visits http://localhost:{port}/example
});

// export the router module so that the server.js file can use it 
export default exampleRoute;