import express from "express";

// Import all the dependencies
const router = express.Router();

// Define a route
router.get('/', (req, res) => {
    res.send('This is the example route'); // This will get executed when user visits http://localhost:{port}/example
    console.log("HI")
});

// export the router module so that the server.js file can use it 
export default router;