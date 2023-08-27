import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import axios from "axios";

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("/images")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);
  const imageCounts = {};
  images.forEach((image) => {
    const createdAtDate = new Date(image.createdAt.split("T")[0]);
    const dateString = createdAtDate.toISOString().split("T")[0];
    if (imageCounts[dateString]) {
      imageCounts[dateString]++;
    } else {
      imageCounts[dateString] = 1;
    }
  });
  const chartData = {
    labels: Object.keys(imageCounts),
    datasets: [
      {
        label: "Image Count",
        data: Object.values(imageCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <BarChart chartData={chartData} />
    </div>
  );
};

export default HomePage;
