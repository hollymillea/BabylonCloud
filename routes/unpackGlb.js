import express from "express";
import fs from "fs";
import * as BABYLON from '@babylonjs/core';
import { Document, WebIO } from '@gltf-transform/core';
import '@babylonjs/loaders';  // Import the loaders package to include the GLTF loader
import puppeteer from "puppeteer";

const unpackGLB = express.Router();

unpackGLB.get('/', async (req, res) => {
  try {
      // Extract file name from query parameters
      const query = new URLSearchParams(req.url);
      const fileName = query.get('/?fileName');
      const filePath = './glbs/' + fileName;

      // Launch Puppeteer browser
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Navigate to a blank page
      await page.goto('about:blank');

      // Inject Babylon.js library into the page
      await page.addScriptTag({ url: 'https://cdn.babylonjs.com/babylon.js' });

      // Listen for console messages emitted by the page
      page.on('console', msg => {
        console.log('Browser Console:', msg.text()); // Log console messages to the Node.js environment
      });

      // Read the GLB file from the file system
      const file = fs.readFileSync(filePath, 'binary');

      const blob = new Blob([file]);
      let url = URL.createObjectURL(blob);

      // Evaluate your Babylon.js code in the browser context
      const sceneData = await page.evaluate(async (file) => {
          // Create engine
          const engine = new BABYLON.NullEngine();

          // Create scene
          let scene = new BABYLON.Scene(engine);

          console.log("HOLLY");

          // Load GLB file into the scene
          const loadingTask = BABYLON.SceneLoader.Append('', file, scene, undefined, '.glb');

          // Wait for the loading task to complete
          await loadingTask.onFinish;

          // Return the scene
          return scene;
      }, url);

      console.log('Scene data:', sceneData);

      // Close Puppeteer browser
      await browser.close();

      // Send response with scene data
      res.status(200).json(sceneData);
  } catch (error) {
      console.error('Error processing GLB file:', error);
      res.status(500).json({ error: 'Failed to process GLB file' });
  }
});

export default unpackGLB;