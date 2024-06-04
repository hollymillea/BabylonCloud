import express from "express";
import fs from "fs";

const glbUploadRoute = express.Router();

glbUploadRoute.get('/', (req, res) => {
  res.send("TESTING");
})

// Route for handling post requests that are uploads
glbUploadRoute.post('/upload', (req, res) => {
  try {
    // req.url will be: '/upload?fileName=******duck.glb' where ****** are random letters
    console.log(req.url, req.method, req.url==='/upload');
    const query = new URLSearchParams(req.url);
    const fileName = query.get('/upload?fileName');

    console.log(fileName);
    
    req.on('data', chunk => {
      // console.log(chunk);
      fs.appendFileSync(fileName, chunk); // append to a file on the disk
    })
    // Check if file is uploaded
    if (!req.files || !req.files.glbFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const glbFile = req.files.glbFile;

    // Read the GLB file data from the request
    const glbData = glbFile.data;

    console.log(glbData);

    // Load the GLB data into the scene
    // const scene = await loadGLBIntoScene(glbData);

    // Send a success response
    res.status(200).json({ message: 'GLB file loaded into scene successfully' });
  } catch (error) {
    console.error('Error processing GLB file:', error);
    res.status(500).json({ error: 'Failed to process GLB file' });
  }
});

export default glbUploadRoute;