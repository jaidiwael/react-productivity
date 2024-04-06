import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

const TempsCard = ({ onClick }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Temps productive", "Temps non-productif", "Temps manquantes"],
      datasets: [
        {
          data: [86, 6, 8],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-800"),
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--red-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-700"),
            documentStyle.getPropertyValue("--blue-300"),
            documentStyle.getPropertyValue("--red-300"),
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            textAlign: "left",
          },
          position: "bottom",
          // align: "start",
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <div
      onClick={onClick}
      className="bg-white border-round-2xl p-3 h-full flex flex-column align-items-between gap-4 cursor-pointer"
    >
      <div className="text-l text-color text-center border-bottom-1 border-200 pb-2">
        Temps
      </div>
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        className="w-full"
      />
    </div>
  );
};
export default TempsCard;
