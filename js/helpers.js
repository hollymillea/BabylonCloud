import * as GUI from '@babylonjs/gui';
import './helpers.css';
import * as BABYLON from '@babylonjs/core';

export const createBackendTestButton = (advancedTexture) => {
  const button = GUI.Button.CreateSimpleButton("button", "Click Me");
  button.width = "150px";
  button.height = "40px";
  button.color = "white";
  button.background = "green";

  button.onPointerClickObservable.add(async function() {
    try {
      // Send a GET request to '/example' route
      const response = await fetch('/example');
      if (!response.ok) {
        throw new Error('Network was not okay');
      }
      const data = await response.text();
      console.log("DATA:", data);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  });

  advancedTexture.addControl(button);
}


export const createFileInputBox = (scene) => {
  // Create an input box to read in GLBs
  var glbInput = document.createElement('input');
  glbInput.type = 'file';
  glbInput.id = 'glbInput';
  glbInput.accept = '.glb';

  // Event listener for input change
  glbInput.addEventListener('change', function (event) {
    var file = event.target.files[0];
    if (file) {
      loadGLB(scene, file);
    }
  });

  // Add to the front-end page
  document.body.appendChild(glbInput);
}


export const loadGLB = (scene, file) => {
  BABYLON.SceneLoader.ImportMesh('', 'file:///', file, scene, function (meshes) {
      console.log('GLB file loaded:', meshes);
    });
}