import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import the Chart.js library

function BarChart({ chartData }) {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartContainer.current) {
      chartInstance.current = new Chart(chartContainer.current, {
        type: "pie",
        data: {
          ...chartData,
          labels: chartData.labels.map((dateString) =>
            new Date(dateString).toLocaleDateString()
          ),
        },
        options: {
          // You can add any Chart.js options here
        },
      });
    }
  }, [chartData]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center">
        <canvas ref={chartContainer} className="w-full" />
      </div>
    </div>
  );
}

export default BarChart;
