import './App.css';
import * as tf from '@tensorflow/tfjs';
import { useState } from "react";
import Dropzone from "./dropzone"
import deskew from "./deskew"

const sample1 = require("./assets/sample1.jpg");
const sample2 = require("./assets/sample2.jpg");
const sample3 = require("./assets/sample3.jpg");
const ghMark = require("./assets/GitHub-Mark-Light-64px.png");

function SampleImage(props) {
  return (
    <img src={props.src} className='sample-image' onClick={props.onClick} />
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h2 style={{marginLeft: 45}}>Fast Document Deskew</h2>
          <a href="https://github.com/cgkim412/fast-document-deskew" target="_blank"><img className="github-mark" src={ghMark}/></a>
        </div>
        <Dropzone text="사진을 업로드해 주세요" onDrop={onImageDrop} />
        <p>혹은 샘플 중에서 골라 보세요</p>
        <div className="flex">
          <SampleImage src={sample1} onClick={onImageClick} />
          <SampleImage src={sample2} onClick={onImageClick} />
          <SampleImage src={sample3} onClick={onImageClick} />
        </div>
        <img src={image} className="output-image" onLoad={onImageLoad} style={{ transform: `rotate(${rotation}deg)` }} />
      </header>
    </div>
  );
}

export default App;
