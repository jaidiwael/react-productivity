import React, { useState, useEffect } from "react";
import BreadCrumb from "./breadCrumb";
import { SelectButton } from "primereact/selectbutton";
import { Chart } from "primereact/chart";

const ProductivityChart = ({ award, breadCrumb }) => {
  const [view, setView] = useState(null);
  const [timeRange, setTimeRange] = useState(null);
  // const [lineChartData, setLineChartData] = useState({});
  // const [lineChartOptions, setLineChartOptions] = useState({});

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
  const lineChartData = {
    labels: ["v", "S", "D", "L", "M", "Me", "J"],
    datasets: [
      {
        label: "Predit",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue("--teal-300"),
      },
      {
        label: "Realisé",
        data: [12, 51, 62, 33, 21, 62, 45],
        fill: true,
        borderColor: documentStyle.getPropertyValue("--blue-500"),
        tension: 0.4,
        backgroundColor: "rgba(12, 105, 213,0.2)",
      },
      {
        label: "semaine Precedente",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderDash: [5, 5],
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue("--gray-400"),
      },
    ],
  };
  const pieChartData = {
    labels: ["Temps productif", "Temps non-productif", "Temps manquants"],
    datasets: [
      {
        data: [86, 6, 8],
        backgroundColor: [
          documentStyle.getPropertyValue("--blue-900"),
          documentStyle.getPropertyValue("--blue-400"),
          documentStyle.getPropertyValue("--red-300"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--blue-800"),
          documentStyle.getPropertyValue("--blue-300"),
          documentStyle.getPropertyValue("--red-200"),
        ],
      },
    ],
  };
  const pieChartOptions = {
    plugins: {
      legend: {
        position: "left",
        labels: {
          usePointStyle: true,
        },
      },
    },
  };
  const lineChartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: "bottom",
        align: "end",
        labels: {
          fontColor: textColor,
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

  const views = [
    {
      icon: "pi pi-list text-xs",
      value: "list",
      className: "border-noround-right",
    },
    {
      icon: "pi pi-chart-line text-xs",
      value: "chart",
      className: "border-noround-left",
    },
  ];
  const timeOptions = [
    { value: "Heure", className: "border-noround-right border-round-left-3xl" },
    { value: "Jour", className: "border-noround-left border-round-right-3xl" },
  ];

  const viewsTemplate = (item) => {
    return <i className={item.icon}></i>;
  };

  const timeTemplate = (item) => {
    return <span>{item.value}</span>;
  };

  return (
    <div className="bg-white border-round-2xl px-3 shadow-1 h-full flex flex-column">
      {award === "best" && (
        <div className="best-performance-bg text-white text-center -mx-3 p-2 border-round-top-2xl">
          Meilleure performance
        </div>
      )}
      {award === "worst" && (
        <div className="worst-performance-bg text-white text-center -mx-3 p-2 border-round-top-2xl">
          Moins bonnes performances
        </div>
      )}
      <div className="text-center text-xl	my-2">
        <BreadCrumb items={breadCrumb} />
      </div>
      <div className="flex justify-content-between align-items-center">
        <SelectButton
          value={view}
          onChange={(e) => setView(e.value)}
          itemTemplate={viewsTemplate}
          options={views}
          pt={{
            button: {
              className: "p-2",
            },
          }}
        />
        <SelectButton
          value={timeRange}
          onChange={(e) => setTimeRange(e.value)}
          options={timeOptions}
          itemTemplate={timeTemplate}
          pt={{
            button: {
              className: "py-1 px-3",
            },
          }}
        />
      </div>
      <div className="my-3">
        <Chart type="line" data={lineChartData} options={lineChartOptions} />
        <Chart
          type="pie"
          data={pieChartData}
          options={pieChartOptions}
          className="w-30rem"
        />
      </div>
    </div>
  );
};
export default ProductivityChart;

ProductivityChart.defaultProps = {
  award: "best",
  breadCrumb: [{ label: "Réception", action: () => {} }],
};
