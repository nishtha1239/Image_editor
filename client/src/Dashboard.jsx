import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import Card from "./Card";
import ImageModal from "./ImageModal";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/images")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  const handleCardClick = (imageURL) => {
    setSelected(imageURL);
  };

  const handleCloseModal = () => {
    setSelected(null);
  };

  return (
    <div className="ml-[20px] mt-[20px] text-5xl mt-5">
      <div className="justify-center">
        <ImageUpload />
        <div className="flex flex-row gap-5 flex-wrap  ">
          {images.map((image, index) => (
            <Card
              key={index}
              id={image._id}
              src={`http://localhost:4000/public/images/${image.image}`}
              tags={image.tags}
              onClick={() =>
                handleCardClick(
                  `http://localhost:4000/public/images/${image.image}`
                )
              }
            />
          ))}
        </div>
        {selected && (
          <ImageModal imageURL={selected} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
