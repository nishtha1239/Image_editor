import React, { useState } from "react";
import { useImage } from "./Context";

export default function Overlay(props) {
  const { selectedImage } = useImage();
  const [formData, setFormData] = useState({
    content: "",
    color: "",
    size: "",
  });
  const [overlayStyle, setOverlayStyle] = useState({});
  const [toggle, setToggle] = useState(false);
  const handleChange = (ev) => {
    setFormData((prev) => {
      return {
        ...prev,
        [ev.target.name]: ev.target.value,
      };
    });
  };
  function handleSubmit(ev) {
    ev.preventDefault();
    console.log(formData);
    setToggle(true);
  }
  const getImageDimensions = () => {
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      const imageWidth = img.width;
      const imageHeight = img.height;
      const textSize = Math.min(imageWidth, imageHeight) * 0.1;

      setOverlayStyle({
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: `${textSize}px`,
        height: `${textSize}px`,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: formData.color,
        fontSize: formData.size,
      });
    };
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="content"
          className="border border-gray-300 rounded px-2 py-1 mr-2"
          type="text"
          value={formData.content}
          placeholder="Write the Text"
          onChange={handleChange}
        />
        <select
          name="color"
          id="color"
          value={formData.color}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        >
          <option value="">Select Color</option>
          <option value="#e53935">Red</option>
          <option value="#38bdf8">Blue</option>
          <option value="#bef264">Green</option>
          <option value="#f97316">Orange</option>
          <option value="#facc15">Yellow</option>
          <option value="#0c0a09">Black</option>
          <option value="#fafaf9">White</option>
        </select>
        <select
          name="size"
          id="size"
          value={formData.size}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Select Size</option>
          <option value="5px">5px</option>
          <option value="10px">10px</option>
          <option value="15px">15px</option>
          <option value="20px">20px</option>
          <option value="25px">25px</option>
          <option value="30px">30px</option>
          <option value="50px">50px</option>
        </select>
        <button className="bg-blue-500 ml-2 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
          Submit
        </button>
      </form>
      <div
        className="relative text-center"
        style={{
          fontSize: formData.size,
          color: formData.color,
        }}
      >
        <img
          src={selectedImage}
          alt="not exist"
          className="relative inline-block"
          onLoad={(e) => {
            getImageDimensions;
          }}
        />
        {toggle && (
          <div
            className="absolute flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            onClick={() => {
              setFormData({
                content: "",
                color: "",
                size: "",
              });
              setToggle(false);
            }}
          >
            {formData.content}
          </div>
        )}
      </div>
    </div>
  );
}
