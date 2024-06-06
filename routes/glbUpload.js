import express from "express";
import fs from "fs";

const glbUploadRoute = express.Router();

glbUploadRoute.get('/', (req, res) => {
  res.send("TESTING");
})

// Route for handling post requests that are uploads
glbUploadRoute.post('/', async (req, res) => {
  try {
    // req.url will be: '/upload?fileName=******duck.glb' where ****** are random letters
    const query = new URLSearchParams(req.url);
    const fileName = query.get('/?fileName');
    
    req.on('data', chunk => {
      // console.log(chunk);
      fs.appendFileSync('./glbs/'+fileName, chunk); // append to a file on the disk
    });

    // Send a success response
    res.status(200).json({ message: 'GLB file loaded into scene successfully' });
  } catch (error) {
    console.error('Error processing GLB file:', error);
    res.status(500).json({ error: 'Failed to process GLB file' });
  }
});

export default glbUploadRoute;