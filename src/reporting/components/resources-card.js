import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import ResourcesPercentage from "./resources-percentage";

const ResourcesCard = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["v", "S", "D", "L", "M", "Me", "J"],
      datasets: [
        {
          label: "Etp plannifié",
          backgroundColor: documentStyle.getPropertyValue("--cyan-500"),
          borderColor: documentStyle.getPropertyValue("--cyan-500"),
          data: [65, 59, 80, 81, 56, 55, 40],
          borderRadius: {
            topLeft: 20,
            topRight: 20,
            bottomLeft: 20,
            bottomRight: 20,
          },
        },
        {
          label: "Etp Réel",
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          data: [28, 48, 40, 40, 86, 60, 90],
          borderRadius: {
            topLeft: 20,
            topRight: 20,
            bottomLeft: 20,
            bottomRight: 20,
          },
        },
        {
          label: "Etp semaine précèdente",
          backgroundColor: documentStyle.getPropertyValue("--gray-400"),
          borderColor: documentStyle.getPropertyValue("--gray-400"),
          data: [40, 60, 50, 19, 20, 27, 10],
          borderRadius: {
            topLeft: 20,
            topRight: 20,
            bottomLeft: 20,
            bottomRight: 20,
          },
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.9,
      plugins: {
        legend: {
          position: "bottom",
          align: "end",
          labels: {
            //pointStyleWidth: 5,
            usePointStyle: true,
            fontColor: textColor,
            //pointStyle: "circle",
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
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <div className="bg-white border-round-2xl p-3">
      <div className="flex gap-3 mb-5">
        <ResourcesPercentage
          value={110}
          label={`Taux d'utilisation de la capacité`}
        />
        <ResourcesPercentage
          value={89}
          label={`Efficacité plannification charge/capa`}
        />
        <ResourcesPercentage value={2} label={`Taux d'absenteisme`} />
        <ResourcesPercentage value={50} label={`Taux multi-tâches`} />
      </div>
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
};
export default ResourcesCard;
