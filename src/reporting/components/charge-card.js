import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

const ChargeCard = ({ values }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    if (values) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = "rgba(255,255,255,1";
      const textColorSecondary = documentStyle.getPropertyValue("--gray-100");
      const surfaceBorder = "rgba(255,255,255,0.4)";
      const data = {
        labels: values?.labels,
        datasets: [
          {
            label: "Predit",
            data: values?.forecastValues,
            fill: false,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue("--cyan-300"),
            backgroundColor: documentStyle.getPropertyValue("--cyan-300"),
          },
          {
            label: "Realisé",
            data: values?.realValues,
            fill: false,
            borderColor: documentStyle.getPropertyValue("--blue-500"),
            tension: 0.4,
            backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          },
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
              //pointStyleWidth: 1,
              usePointStyle: true,
              color: textColor,
              boxHeight: 5,
              boxWidth: 5,
              padding: 10,
              font: {
                size: 10,
              },
              // boxPadding: 100,
              // pointStyle: ({ chart }) => {
              //   const image = new Image();
              //   image.src = Logo;
              //   image.width = 10;
              //   image.height = 10;
              //   return image;
              // },
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
    }
  }, [values]);
  return (
    <div className="bg-card border-round-2xl px-3 py-2 h-full cursor-pointer">
      <Chart
        type="line"
        data={chartData}
        options={chartOptions}
        style={{ height: "450px" }}
      />
    </div>
  );
};
export default ChargeCard;
