import express from "express";
import exampleRoute from "./routes/example.js";
import cors from "cors";
import glbUploadRoute from "./routes/glbUpload.js";

// Create the server
const app = express();

// Use the cors middleware to enable CORS
app.use(cors());

// Use routes (i.e., connect the routes to the server)
app.use('/', glbUploadRoute);
app.use('/example', exampleRoute);


// Set up and listen to a port 
const port = 5173;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;