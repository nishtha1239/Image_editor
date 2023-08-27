import React, { useState } from "react";

export default function ImageRotate({ src }) {
  const [rotation, setRotation] = useState(0);

  const rotate = () => {
    const newRotation = rotation + 90;
    setRotation(newRotation >= 360 ? -360 : newRotation);
  };

  const rotateLeft = () => {
    const newRotation = rotation - 90;
    setRotation(newRotation <= -360 ? 360 : newRotation);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <button
          onClick={rotate}
          className="mt-5 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Rotate Right
        </button>
      </div>
      <div className="mb-4">
        <button
          onClick={rotateLeft}
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Rotate Left
        </button>
      </div>
      <div
        className="flex justify-center"
        style={{ maxWidth: "100%", overflow: "hidden" }}
      >
        <img
          src={src}
          alt="Rotated"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.3s ease-in-out", // Add smooth transition
          }}
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}
