import React, { useState } from "react";
import { useImage } from "./Context";

function Resizing(props) {
  const { selectedImage } = useImage();

  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);

  const handleResize = () => {
    const img = new Image();
    img.src = selectedImage;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const newWidth = width;
      const newHeight = newWidth / aspectRatio;

      setHeight(newHeight);
    };
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="image-container mb-4">
        <img
          src={selectedImage}
          alt="Resized"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </div>
      <div className="flex items-center">
        <label className="mr-2">Width:</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value))}
          className="border px-2 py-1 rounded mr-2"
        />
        <label className="mr-2">Height:</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
          className="border px-2 py-1 rounded mr-2"
        />
        <button
          onClick={handleResize}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Resize
        </button>
      </div>
    </div>
  );
}

export default Resizing;
