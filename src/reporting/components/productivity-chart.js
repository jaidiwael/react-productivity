import React, { useState, useEffect } from "react";
import BreadCrumb from "./breadCrumb";
import { SelectButton } from "primereact/selectbutton";
import { Chart } from "primereact/chart";

const ProductivityChart = ({ award, breadCrumb, activity }) => {
  const [timeRange, setTimeRange] = useState(1);
  const [lineChartOptions, setLineChartOptions] = useState();

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = "rgba(255,255,255,1";
  const textColorSecondary = documentStyle.getPropertyValue("--gray-100");
  const surfaceBorder = "rgba(255,255,255,0.4)";
  const lineChartData = {
    labels: ["v", "S", "D", "L", "M", "Me", "J"],
    datasets: [
      {
        label: "Cible",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue("--teal-300"),
      },
      {
        label: "Realisé",
        data: [12, 51, 62, 33, 21, 62, 45],
        fill: false,
        borderColor: documentStyle.getPropertyValue("--blue-500"),
        tension: 0.4,
        backgroundColor: "rgba(12, 105, 213,0.2)",
      },
    ],
  };
  const pieChartData = {
    labels: ["v", "S", "D", "L", "M", "Me", "J"],
    datasets: [
      {
        label: "ETP plannifié",
        backgroundColor: documentStyle.getPropertyValue("--cyan-300"),
        borderColor: documentStyle.getPropertyValue("--cyan-300"),
        data: [65, 59, 80, 81, 56, 55, 40],
        barThickness: 20,
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20,
        },
      },
      {
        label: "ETP réel",
        backgroundColor: documentStyle.getPropertyValue("--gray-100"),
        borderColor: documentStyle.getPropertyValue("--gray-100"),
        data: [28, 48, 40, 40, 86, 60, 90],
        barThickness: 20,
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20,
        },
      },
    ],
  };
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
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
          drawBorder: true,
          display: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        border: {
          color: surfaceBorder,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: true,
        },
      },
    },
  };

  useEffect(() => {
    setLineChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        tooltip: {
          backgroundColor: activity.color || "#fff",
        },
        legend: {
          position: "bottom",
          align: "end",
          labels: {
            color: textColor,
            usePointStyle: true,
            pointStyle: "line",
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
            //color: surfaceBorder,
            drawBorder: false,
            display: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          border: {
            color: surfaceBorder,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    });
  }, [activity]);

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

  return (
    <div className=" h-full flex flex-column">
      <div className="bg-blue-800 text-white border-round-2xl px-3 shadow-1">
        <div
          className=" text-white text-center -mx-3 p-2 border-round-top-2xl mb-3"
          style={{
            backgroundColor: activity?.color,
          }}
        >
          {/* {activity?.activity} */}
          <BreadCrumb items={breadCrumb} />
        </div>

        {/* {award === "worst" && (
          <div className="worst-performance-bg text-white text-center -mx-3 p-2 border-round-top-2xl">
            Moins bonnes performances
          </div>
        )} */}
        {/* <div className="text-center text-xl	my-2">
          <BreadCrumb items={breadCrumb} />
        </div> */}

        <div className="text-white  flex justify-content-end">
          <SelectButton
            allowEmpty={false}
            value={timeRange}
            onChange={(e) => setTimeRange(e.value)}
            optionLabel="name"
            options={[
              { name: "Jour", value: 1 },
              { name: "Semaine", value: 2 },
              { name: "Mois", value: 3 },
            ]}
            pt={{
              root: "border-round-2xl overflow-hidden",
              button: "py-1 border-noround",
            }}
          />
        </div>
        <div className="my-3">
          <Chart type="line" data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
      <div className="bg-blue-800 text-white border-round-2xl px-3 shadow-1 mt-3">
        <div className="my-3">
          <Chart
            type="bar"
            data={pieChartData}
            options={pieChartOptions}
            className="mt-3"
          />
        </div>
      </div>
    </div>
  );
};
export default ProductivityChart;

ProductivityChart.defaultProps = {
  award: "best",
  breadCrumb: [{ label: "Réception", action: () => {} }],
};
