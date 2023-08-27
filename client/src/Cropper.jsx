import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useImage } from "./Context";

export default function Cropper(props) {
  const { selectedImage } = useImage();
  const [crop, setCrop] = useState({
    unit: "px",
    width: 200,
    height: 200,
    x: 100,
    y: 100,
  });
  const [croppedImage, setCroppedImage] = useState(null);
  const imageRef = useRef(null);

  function onImageLoad(e) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const desiredWidth = 200;
    const aspectRatio = 16 / 9;
    const desiredHeight = desiredWidth / aspectRatio;
    const desiredX = (width - desiredWidth) / 2;
    const desiredY = (height - desiredHeight) / 2;

    const newCrop = {
      x: desiredX,
      y: desiredY,
      width: desiredWidth,
      height: desiredHeight,
      unit: "px",
    };
    setCrop(newCrop);
  }

  const handleCropComplete = () => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Set the crossOrigin property
    image.src = selectedImage;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      const croppedImageUrl = canvas.toDataURL("image/jpeg");
      setCroppedImage(croppedImageUrl);
    };
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col items-center">
        <ReactCrop
          src={selectedImage}
          crop={crop}
          aspect={16 / 9}
          onImageLoaded={onImageLoad}
          onChange={(crop, percentCrop) => setCrop(crop)}
          ref={imageRef}
        >
          <img src={selectedImage} alt="Selected" />
        </ReactCrop>
        <button
          className="mt-2 bg-blue-500 w-20 text-white text-[20px] rounded-full"
          onClick={handleCropComplete}
        >
          Crop
        </button>
      </div>
      {croppedImage && (
        <div className="mt-3 flex justify-center">
          <img src={croppedImage} alt="Cropped" />
        </div>
      )}
    </div>
  );
}
