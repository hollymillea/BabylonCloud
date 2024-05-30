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


export const createFileInputBox = (scene, serverURL) => {
  // Create an input box to read in GLBs
  var glbInput = document.createElement('input');
  glbInput.type = 'file';
  glbInput.id = 'glbInput';
  glbInput.accept = '.glb';

  // Event listener for input change
  glbInput.addEventListener('change', function (event) {
    var file = event.target.files[0];
    // If a file has been input, send this to our server
    if (file) {
      uploadGLB(file, serverURL);
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

// Send our file to our server
export const uploadGLB = (file, serverURL) => {
  var formData = new FormData();

  // Give our file the name of 'glbFile' so the server can identify it
  formData.append('glbFile', file);

  fetch(serverURL, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to upload GLB file');
    }
    console.log('GLB file uploaded successfully');
  })
  .catch(error => {
    console.error('Error uploading GLB file:', error);
  });
}