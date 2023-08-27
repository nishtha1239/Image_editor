import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function ImageModal({ imageURL, onClose }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="max-w-full max-h-full">
        <img src={imageURL} alt="Selected" className="w-full h-auto" />
      </div>
      <button
        className="absolute top-4 right-4 text-white text-[50px]"
        onClick={onClose}
      >
        <CloseIcon style={{ fontSize: "36px" }} />
      </button>
    </div>
  );
}

export default ImageModal;
