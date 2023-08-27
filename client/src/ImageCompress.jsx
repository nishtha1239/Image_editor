import React, { useRef, useState } from "react";
import { useImage } from "./Context";

export default function ImageCompress() {
  const imgRef = useRef(null);
  const { selectedImage } = useImage();

  const [editedFile, setEditedFile] = useState({
    properties: {
      effects: {
        brightness: 1,
        contrast: 1,
        saturation: 1,
        blur: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
    },
  });
  const [selectedFormat, setSelectedFormat] = useState("png");

  const downloadFilteredImage = () => {
    const imgElement = imgRef.current;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    context.filter = `brightness(${
      editedFile.properties.effects.brightness || 1
    }) contrast(${editedFile.properties.effects.contrast || 1}) saturate(${
      editedFile.properties.effects.saturation || 1
    }) blur(${editedFile.properties.effects.blur || 0}px)`;
    context.setTransform(
      editedFile.properties.scale.x || 1,
      0,
      0,
      editedFile.properties.scale.y || 1,
      0,
      0
    );
    context.drawImage(imgElement, 0, 0);
    const dataURL =
      selectedFormat === "png"
        ? canvas.toDataURL("image/png")
        : canvas.toDataURL("image/jpeg");
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = `filtered_image.${selectedFormat}`;
    downloadLink.click();
  };

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  return (
    <div className="mt-5">
      <img
        ref={imgRef}
        src={selectedImage}
        alt="Filtered Image"
        crossOrigin="anonymous"
      />
      <div className="flex items-center flex-col space-y-4">
        <label className="text-gray-600">
          Format:
          <select
            value={selectedFormat}
            onChange={(e) => handleFormatChange(e.target.value)}
            className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
          </select>
        </label>
        <button
          onClick={downloadFilteredImage}
          className="px-4 py-2 text-white bg-blue-400 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          Download
        </button>
      </div>
    </div>
  );
}
