import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

const ChargeCard = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = "rgba(255,255,255,1";
    const textColorSecondary = documentStyle.getPropertyValue("--gray-100");
    const surfaceBorder = "rgba(255,255,255,0.4)";
    const data = {
      labels: ["v", "S", "D", "L", "M", "Me", "J"],
      datasets: [
        {
          label: "Predit",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue("--teal-300"),
          backgroundColor: documentStyle.getPropertyValue("--teal-300"),
        },
        {
          label: "Realisé",
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
        },
        /* {
          label: "semaine Precedente",
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue("--gray-200"),
        }, */
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          position: "bottom",
          align: "end",
          labels: {
            //pointStyleWidth: 5,
            usePointStyle: true,
            color: textColor,
            pointStyle: "circle",
            padding: 30,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          border: {
            color: surfaceBorder,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: true,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: "white",
            display: false,
            drawBorder: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <div className="bg-card border-round-2xl p-3 h-full cursor-pointer">
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
};
export default ChargeCard;
