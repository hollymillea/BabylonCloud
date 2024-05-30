import express from "express";
import fileUpload from "express-fileupload";

const glbUploadRoute = express.Router();

// Use file upload middleware
glbUploadRoute.use(fileUpload());

// Route for handling GLB file uploads
glbUploadRoute.post('/', async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.files || !req.files.glbFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const glbFile = req.files.glbFile;

    // Read the GLB file data from the request
    const glbData = glbFile.data;

    // Load the GLB data into the scene
    const scene = await loadGLBIntoScene(glbData);

    // Send a success response
    res.status(200).json({ message: 'GLB file loaded into scene successfully' });
  } catch (error) {
    console.error('Error processing GLB file:', error);
    res.status(500).json({ error: 'Failed to process GLB file' });
  }
});

export default glbUploadRoute;