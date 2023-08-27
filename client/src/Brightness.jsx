import React, { useState } from "react";
import { Slider } from "@mui/material";
import { useImage } from "./Context";

function Brightness(props) {
  const [brightness, setBrightness] = useState(100); // Default to 100% brightness
  const { selectedImage } = useImage();

  const handleBrightnessChange = (event, newValue) => {
    setBrightness(newValue);
    if (selectedImage) {
      const imageElement = document.getElementById("selectedImage");
      if (imageElement) {
        imageElement.style.filter = `brightness(${newValue}%)`;
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: "300px", margin: "0 auto" }}>
        <Slider
          aria-label="Brightness"
          value={brightness}
          onChange={handleBrightnessChange}
          step={1}
          valueLabelDisplay="auto"
          min={0}
          max={200}
        />
      </div>
      {selectedImage && (
        <img
          id="selectedImage"
          src={selectedImage}
          alt="Selected"
          className="max-w-full h-auto ml-10"
        />
      )}
    </div>
  );
}

export default Brightness;
