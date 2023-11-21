import React from "react";
import {useRef, useState} from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";

import './App.css';

function App() {
  
  const canvasDrawRef = useRef(null);

  const [image, setImage] = useState("")

  const canvasDrawClear = () => {
    if (!canvasDrawRef.current) return

    canvasDrawRef.current.clear();
  }

  const canvasDrawExport = () => {
    if (!canvasDrawRef.current) return
    
    const img = canvasDrawRef.current.getDataURL("img", false, "#FFF");
    setImage(img);
    console.log(img);
  }


  const canvasDrawProps = {
    backgroundColor: "#FFF",
    brushRadius: 2,
    brushColor: "#ff0000",
  };

  return (
    <div className="App">
      <CanvasDraw ref={canvasDrawRef} {...canvasDrawProps}/>
      <button onClick={canvasDrawClear}>Clear!</button>
      <button onClick={canvasDrawExport}>Export</button>

      <img src={image} alt="Embedded Image" />
    </div>
  );
}

export default App;
