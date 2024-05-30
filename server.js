import express from "express";
import exampleRoute from "./routes/example.js";
import path from "path";
import { fileURLToPath } from 'url';

// Create the server
const app = express();

// Use routes (i.e., connect the routes to the server)
app.use('/example', exampleRoute);

// Set up and listen to a port 
const port = 5173;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;