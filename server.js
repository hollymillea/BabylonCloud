import express from "express";
import exampleRoute from "./routes/example.js";
import multer from "multer";
import cors from "cors";

// Create the server
const app = express();

// Use the cors middleware to enable CORS
app.use(cors());

// Use routes (i.e., connect the routes to the server)
app.use('/example', exampleRoute);


// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Specify the directory where the GLB files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for storing
  }
});

const upload = multer({ storage: storage });

// Route for handling file uploads (we are expecting a single file with the name 'glbFile')
app.post('/upload-glb', upload.single('glbFile'), (req, res) => {
  res.send("holly");
  // Handle the uploaded GLB file here
  console.log('GLB file uploaded:', req.file);

  // Check if file is uploaded successfully
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Send a success response
  res.status(200).json({ message: 'GLB file uploaded successfully' });
});


// Set up and listen to a port 
const port = 5173;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;