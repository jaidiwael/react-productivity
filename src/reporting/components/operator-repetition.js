import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import ResourcesPercentage from "./resources-percentage";
import DaySelector from "./day-selector";

const OperatorRepetition = ({ operator }) => {
  const [selectedDays, setSelectedDays] = useState("7");
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const days = [
    {
      label: "7 dernier jours",
      value: "7",
    },
    {
      label: "14 dernier jours",
      value: "14",
    },
    {
      label: "30 dernier jours",
      value: "30",
    },
  ];
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
          type: "bar",
          label: "pick",
          barThickness: 20,
          backgroundColor: "#00308F",
          data: [50, 25, 12, 48, 90, 76, 42],
        },
        {
          type: "bar",
          label: "pack",
          barThickness: 20,
          backgroundColor: "turquoise",
          data: [21, 84, 24, 75, 37, 65, 34],
        },
        {
          type: "bar",
          label: "Support",
          barThickness: 20,
          backgroundColor: "#6CB4EE",
          data: [41, 52, 24, 74, 23, 21, 32],
        },
        {
          type: "bar",
          label: "Temps manquant",
          barThickness: 20,
          backgroundColor: "#EA3C53",
          data: [41, 52, 24, 74, 23, 21, 32],
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
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          display: false,
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <div className="grid bg-white border-round-2xl shadow-1 h-full p-4">
      <div className="col-12 text-center font-medium">
        Repetition du temps de {operator?.name}
      </div>
      <div className="col-4">
        <div className="font-medium">Temps Global</div>
        <div className="flex gap-3 mt-4">
          <div className="flex flex-column  gap-3">
            <ResourcesPercentage value={3} label={`Temps manquants`} />
            <ResourcesPercentage value={10} label={`Support`} />
          </div>
          <div>
            <ResourcesPercentage value={65} label={`pack`} className="h-full" />
          </div>
        </div>
      </div>
      <div className="col-8">
        <div className="text-right">
          <DaySelector
            items={days}
            selected={selectedDays}
            setSelected={setSelectedDays}
          />
        </div>
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default OperatorRepetition;
