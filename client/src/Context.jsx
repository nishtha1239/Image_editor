import { createContext, useContext, useState } from "react";

const ImageContext = createContext();

export const useImage = () => {
  return useContext(ImageContext);
};

export function ImageProvider({ children }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const value = {
    selectedImage,
    setSelectedImage,
  };

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
}
