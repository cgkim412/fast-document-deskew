import './App.css';
import * as tf from '@tensorflow/tfjs';
import { useState } from "react";
import Dropzone from "./dropzone"
import deskew from "./deskew"

const sample1 = require("./assets/sample1.jpg");
const sample2 = require("./assets/sample2.jpg");
const sample3 = require("./assets/sample3.jpg");

function SampleImage(props) {
  return (
    <img src={props.src} width={240} height={240} onClick={props.onClick} />
  )
}

function App() {

  const [image, setImage] = useState(sample1);
  const [rotation, setRotation] = useState(0);

  const onImageClick = (e) => {
    setImage(e.target.src);
  };

  const onImageLoad = (e) => {
    const img = tf.browser.fromPixels(e.target);
    const angle = deskew(img);
    setRotation(-angle);
  };
  
  const onImageDrop = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file[0]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Fast Document Deskew</h2>
        <Dropzone text="사진을 업로드해 주세요" onDrop={onImageDrop} />
        <p>혹은 샘플 중에서 골라 보세요</p>
        <div className="flex">
          <SampleImage src={sample1} onClick={onImageClick} />
          <SampleImage src={sample2} onClick={onImageClick} />
          <SampleImage src={sample3} onClick={onImageClick} />
        </div>
        <img src={image} width={400} height={400} onLoad={onImageLoad} style={{ transform: `rotate(${rotation}deg)`, marginTop: 100 }} />
      </header>
    </div>
  );
}

export default App;
