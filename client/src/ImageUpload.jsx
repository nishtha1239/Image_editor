import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ImageUpload() {
  const [toggle, setToggle] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      axios
        .post("http://localhost:4000/upload", formData)
        .then((response) => {
          console.log(response.data);
          navigate(0);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setToggle((prev) => !prev);
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col">
      <div className="h-15 w-[150px] flex gap-4 text-[20px] mb-5">
        <button
          style={{ backgroundColor: "#64748b" }}
          className="w-8 h-8 flex items-center justify-center text-center text-white rounded-full"
          onClick={handleToggle}
        >
          +
        </button>
        <h2>Add Image</h2>
      </div>
      {toggle && (
        <div className="relative text-10 flex gap-2 mt-2">
          <input
            type="file"
            id="fileInput"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={handleChooseFile}
            className=" w-[75px] flex items-center justify-center mb-2 bg-blue-300 text-[10px] text-white px-2 py-1 rounded-full cursor-pointer text-xs hover:bg-blue-600 transition-all"
          >
            Choose File
          </button>
          <button
            onClick={handleUpload}
            className="w-[75px] flex items-center justify-center mb-2 bg-green-400 text-[10px] text-white px-2 py-1 rounded-full cursor-pointer text-xs hover:bg-green-600 transition-all"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
