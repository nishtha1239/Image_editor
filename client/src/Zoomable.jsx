import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut } from "@mui/icons-material";
import { useImage } from "./Context";

export default function Zoomable(props) {
  const [scale, setScale] = useState(1);
  const { selectedImage } = useImage();
  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    setScale(scale - 0.1);
  };
  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={200}
      initialPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="m-2">
            <button
              onClick={() => zoomIn()}
              className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              <ZoomIn />
            </button>
            <button
              onClick={() => zoomOut()}
              className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              <ZoomOut />
            </button>
            <button
              onClick={() => resetTransform()}
              className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
          <TransformComponent>
            <img src={selectedImage} alt="test" />
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}
