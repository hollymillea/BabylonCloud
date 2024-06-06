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

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async (event) => {
      // This is the data
      const content = event.target.result;

      // How many chunks are we splitting our data up into?
      const dataSize = content.byteLength;
      const CHUNK_SIZE = 1000;
      const totalChunks = dataSize / CHUNK_SIZE; 
      
      // Generate a file name (add random letters to the string of the glb name)
      const fileName = Math.random().toString(36).slice(-6) + file.name;

      // For every chunk, get the corresponding data and send it to the server
      for (let i = 0; i < totalChunks + 1; i++) {
        // An array buffer of length CHUNK_SIZE
        let chunk = content.slice(i*CHUNK_SIZE, (i+1)*CHUNK_SIZE);
        
        // Send the chunk (we are using the fileName as our unique identifier)
        await fetch(serverURL + '/upload?fileName=' + fileName, {
          'method' : 'POST',
          'headers' : {
              'content-type' : "application/octet-stream",
              'content-length' : chunk.length,
          },
          'body': chunk
        });
      }

      // Once we have sent the whole GLB over to the server, we want to tell the server
      // to unpack the GLB
      await fetch(serverURL + '/unpack?fileName=' + fileName);
    }


    // If a file has been input, send this to our server
    if (file) {
      // uploadGLB(file, serverURL);
    }
  });

  // Add to the front-end page
  document.body.appendChild(glbInput);
}


// Send our file to our server
async function uploadGLB (file, serverURL) {
  var formData = new FormData();

  // Give our file the name of 'glbFile' so the server can identify it
  formData.append('glbFile', file);

  try {
    // Send a POST request to '/upload-glb' route
    const response = await fetch('/upload-glb', {method: 'POST', body: formData});
    
    if (!response.ok) {
      throw new Error('Could not send GLB to server.');
    }
    const data = await response.text();
    console.log("DATA:", data);
  }
  catch (error) {
    console.error("Error sending GLB:", error);
  }
}