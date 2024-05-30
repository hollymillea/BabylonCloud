import './style.css';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';  // Import the loaders package to include the GLTF loader
import * as GUI from '@babylonjs/gui';
import { createBackendTestButton, createFileInputBox } from './helpers';

var createScene = function () {
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.FreeCamera(
    'camera1',
    new BABYLON.Vector3(0, 5, -10),
    scene
  );

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight(
    'light',
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Load the GLB file
  BABYLON.SceneLoader.Append(
    './duck.glb', // Adjust the path to your GLB file
    '',
    scene,
    function (scene) {
      console.log('GLB file loaded');
    },
    null,
    function (scene, message) {
      console.error('Error loading GLB file:', message);
    }
  );

  // Create a full screen UI Button to test browser-server communication
  var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  createBackendTestButton(advancedTexture);

  createFileInputBox(advancedTexture);

  return scene;
};

let engine;
let canvas;

const main = () => {
  canvas = document.getElementById('renderCanvas');
  if (!canvas) {
    return;
  }

  engine = new BABYLON.Engine(canvas, true);
  const scene = createScene();

  window.addEventListener('resize', () => {
    engine.resize();
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
};

main();