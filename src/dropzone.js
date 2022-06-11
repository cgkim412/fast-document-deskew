import React from 'react'
import { useDropzone } from 'react-dropzone'
import "./dropzone.css"

const Dropzone = (props) => {

  const megabytes = 10;
  const bytes = megabytes * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDropAccepted: props.onDrop, accept: 'image/*', maxFiles: 1, maxSize: bytes })

  return (
    <div {...getRootProps()} className='dropzone'>
      <input {...getInputProps()} />
        <p>{props.text}</p>
    </div>
  )
}

export default Dropzone;
