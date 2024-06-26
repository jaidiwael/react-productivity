import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import ChartDataLabels from "chartjs-plugin-datalabels";

import ResourcesPercentage from "./resources-percentage";

const ResourcesCard = ({ values, onClick }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = "rgba(255,255,255,1";
    const textColorSecondary = documentStyle.getPropertyValue("--gray-100");
    const surfaceBorder = "rgba(255,255,255,0.4)";
    const data = {
      labels: values?.labels,
      datasets: [
        {
          label: "ETP planifié",
          backgroundColor: documentStyle.getPropertyValue("--cyan-300"),
          borderColor: documentStyle.getPropertyValue("--cyan-300"),
          data: values?.capaETPs,
          barThickness: 20,
          borderRadius: {
            topLeft: 20,
            topRight: 20,
            bottomLeft: 20,
            bottomRight: 20,
          },
          datalabels: {
            align: "left",
          },
        },
        {
          label: "ETP réel",
          backgroundColor: documentStyle.getPropertyValue("--gray-100"),
          borderColor: documentStyle.getPropertyValue("--gray-100"),
          data: values?.realEtps,
          barThickness: 20,
          borderRadius: {
            topLeft: 20,
            topRight: 20,
            bottomLeft: 20,
            bottomRight: 20,
          },
          datalabels: {
            align: "right",
          },
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          position: "bottom",
          align: "end",
          labels: {
            usePointStyle: true,
            color: textColor,
            // pointStyle: "circle",
            padding: 10,
            boxHeight: 5,
            boxWidth: 5,
            font: {
              size: 10,
            },
          },
        },
        datalabels: {
          //clamp: true,
          anchor: "end", // Position of the labels (start, end, center, etc.)
          // align: "end", // Alignment of the labels (start, end, center, etc.)
          padding: {
            bottom: 30,
          },
          color: function (context) {
            return context.dataset.backgroundColor;
          },
          font: {
            weight: "bold",
            size: "10px",
          },
          formatter: function (value) {
            return value === 0 ? "" : value; // Display the actual data value
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
  }, [values]);
  return (
    <div
      className="bg-card border-round-2xl px-3 py-2  h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-3 mb-2 justify-content-center">
        {/*<ResourcesPercentage
          value={+values?.ratiosList?.capaUsage}
          label={`Taux d'utilisation de la capacité`}
          className="w-8rem	"
        />
        <ResourcesPercentage
          value={+values?.ratiosList?.tension}
          label={`Efficacité plannification charge/capa`}
          className="w-8rem	"
        />
         <ResourcesPercentage
          value={+values?.ratiosList?.absenteeism}
          label={`Taux d'absenteisme`}
          className="w-8rem	"
        /> 
        <ResourcesPercentage
          value={+values?.ratiosList?.multiTask}
          label={
            <div>
              Taux
              <br />
              multi-tâches
            </div>
          }
          className="w-8rem	"
        />
        */}
      </div>
      <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
        plugins={[ChartDataLabels]}
        style={{ height: "100%" }}
      />
    </div>
  );
};
export default ResourcesCard;
