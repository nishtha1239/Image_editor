import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentImages = () => {
  const [recentImages, setRecentImages] = useState([]);

  useEffect(() => {
    const fetchRecentImages = async () => {
      try {
        const response = await axios.get("/recent");
        setRecentImages(response.data);
      } catch (error) {
        console.error("Error fetching recent images:", error);
      }
    };

    fetchRecentImages();
  }, []);

  return (
    <div className="py-6">
      <div className="ml-5 mr-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {recentImages.map((image) => (
          <div key={image.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              src={`/images/${image.image}`}
              alt={`Image ${image.id}`}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <p className="text-sm font-medium text-gray-600">{`${image.createdAt}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentImages;
