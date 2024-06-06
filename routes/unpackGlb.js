import express from "express";
import fs from "fs";
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';  // Import the loaders package to include the GLTF loader
import {File} from '@web-std/file';

const unpackGLB = express.Router();

// Route for handling post requests that are uploads
unpackGLB.get('/', async (req, res) => {
  try {
    // What is our file called?
    const query = new URLSearchParams(req.url);
    const fileName = query.get('/?fileName');

    const file = new File([], './glbs/'+ fileName);

    console.log(file);

    // Create canvas
    // const canvas = document.createElement("div");

    // Create engine
    // const engine = new BABYLON.Engine(canvas);

    // Create scene
    // const scene = new BABYLON.Scene(engine);

    // Unpack the file
    // await BABYLON.SceneLoader.LoadAsync('file:', './glbs/' + fileName);
    
  } catch (error) {
    console.error('Error processing GLB file:', error);
    res.status(500).json({ error: 'Failed to process GLB file' });
  }
});

export default unpackGLB;