import React, { useState } from "react";
import CropIcon from "@mui/icons-material/Crop";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ResizeIcon from "@mui/icons-material/AspectRatio";
import TitleIcon from "@mui/icons-material/Title";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import Box from "@mui/material/Box";
import { useImage } from "./Context"; // Import the context hook
import Cropper from "./Cropper";
import ImageRotate from "./ImageRotate";
import Brightness from "./Brightness";
import Overlay from "./Overlay";
import Zoomable from "./Zoomable";
import Resizing from "./Resizing";
import CompressIcon from "@mui/icons-material/Compress";
import ImageCompress from "./ImageCompress";

export default function Edit(props) {
  const { selectedImage } = useImage();
  const [func, setFunc] = useState({
    crop: false,
    rotate: false,
    bright: false,
    overlay: false,
    zoom: false,
    resize: false,
    compress: false,
  });
  const [toggle, setToggle] = useState(false);
  const [editedImage, setEditedImage] = useState(selectedImage);
  const handler = (event) => {
    const updatedFunc = Object.keys(func).reduce((acc, key) => {
      acc[key] = key === event.target.value;
      return acc;
    }, {});
    setFunc(updatedFunc);
    setToggle(true);
    console.log(updatedFunc);
  };

  return (
    <div className="flex flex-col items-center mt-5 justify-start h-screen">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "fit-content",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor: "background.paper",
          color: "text.secondary",
          "& svg": {
            m: 3,
          },
          "& hr": {
            mx: 1,
          },
        }}
      >
        <button value="crop" onClick={handler}>
          <CropIcon />
        </button>
        <button value="rotate" onClick={handler}>
          <RotateLeftIcon />
        </button>
        <button value="resize" onClick={handler}>
          <ResizeIcon />
        </button>
        <button value="overlay" onClick={handler}>
          <TitleIcon />
        </button>
        <button value="zoom" onClick={handler}>
          <ZoomInIcon />
        </button>
        <button value="bright" onClick={handler}>
          <Brightness1Icon />
        </button>
        <button value="compress" onClick={handler}>
          <CompressIcon />
        </button>
      </Box>
      <div className="mt-5">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full h-auto w-[300px]"
          />
        )}
      </div>
      {func.crop && (
        <Cropper src={editedImage} setEditedImage={setEditedImage} />
      )}
      {func.rotate && <ImageRotate src={editedImage} />}
      {func.bright && (
        <Brightness src={editedImage} setEditedImage={setEditedImage} />
      )}
      {func.overlay && (
        <Overlay src={editedImage} setEditedImage={setEditedImage} />
      )}
      {func.zoom && (
        <Zoomable src={editedImage} setEditedImage={setEditedImage} />
      )}
      {func.resize && (
        <Resizing src={editedImage} setEditedImage={setEditedImage} />
      )}
      {func.compress && <ImageCompress />}
    </div>
  );
}
