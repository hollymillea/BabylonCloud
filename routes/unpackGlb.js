import express from "express";
import fs from "fs";
import * as BABYLON from '@babylonjs/core';
import { Document, WebIO } from '@gltf-transform/core';
import '@babylonjs/loaders';  // Import the loaders package to include the GLTF loader

const unpackGLB = express.Router();

// Route for handling post requests that are uploads
unpackGLB.get('/', async (req, res) => {
  try {
    // What is our file called?
    const query = new URLSearchParams(req.url);
    const fileName = query.get('/?fileName');
    const filePath = './glbs/' + fileName;

    // Create engine
    const engine = new BABYLON.NullEngine();

    // Create scene
    const scene = new BABYLON.Scene(engine);

    // Read the GLB file from the file system
    const file = fs.readFileSync(filePath, 'binary');

    // const holly = new File([file], fileName);

    // Read the GLB file
    const glbBuffer = fs.readFileSync(filePath);

    // Parse the header
    // const magic = glbBuffer.toString('ascii', 0, 4);
    // const version = glbBuffer.readUInt32LE(4);
    // const length = glbBuffer.readUInt32LE(8);

    // Extract the JSON chunk
    const jsonChunkLength = glbBuffer.readUInt32LE(12);
    const jsonChunk = glbBuffer.slice(20, 20 + jsonChunkLength);
    const jsonChunkData = JSON.parse(jsonChunk.toString('utf8'));

    // Extract the binary chunk(s)
    const binaryChunkOffset = 20 + jsonChunkLength;
    const binaryChunk = glbBuffer.slice(binaryChunkOffset);

    console.log(jsonChunkData);
return;

// Parse the GLB file
const doc = new Document();
const io = new WebIO({document: doc});
doc.createBuffer().uri = 'data:' + glbBuffer.toString('base64');
const gltf = io.read(Buffer.from(glbBuffer));
console.log("gltf:", gltf);
return;

    const blob = new Blob([file]);
    let url = URL.createObjectURL(blob);

    // const glbData = fs.readFileSync('./glbs/' + fileName);

    // Append the file to the scene
    await BABYLON.SceneLoader.AppendAsync('', url, scene, undefined, ".glb");

    console.log("holly", fileName, scene);
    
  } catch (error) {
    console.error('Error processing GLB file:', error);
    res.status(500).json({ error: 'Failed to process GLB file' });
  }
});

export default unpackGLB;