import React, { useState, useEffect, useMemo } from "react";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import { useQuery } from "@tanstack/react-query";

import MeterGroup from "../components/meter-group";
import DaySelector from "../components/day-selector";
import OperatorList from "../components/operator-list";
import OperatorRepetition from "../components/operator-repetition";

import { getProductivityTimes } from "../api";
import { arrayColors, renderMinutes } from "../helpers";

const Temps = () => {
  const [selectedDays, setSelectedDays] = useState("7");
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const { data: productivityTimes } = useQuery({
    queryKey: ["getProductivityTimes"],
    queryFn: getProductivityTimes,
  });

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

  const renderProductivityTimes = useMemo(() => {
    return (
      productivityTimes
        // ?.sort(function (a, b) {
        //   if (a.name < b.name) {
        //     return -1;
        //   }
        //   if (a.name > b.name) {
        //     return 1;
        //   }
        //   return 0;
        // })
        ?.map(
          (
            { TotalTimePassedByTrackingType, percentage, trackingTypeName },
            index
          ) => ({
            label: trackingTypeName,
            value: TotalTimePassedByTrackingType,
            percentage,
            color: arrayColors[index],
          })
        )
    );
  }, [productivityTimes]);

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

  const labelTemplate = (item) => {
    return (
      <div className="text-center text-sm">
        <span>{item?.percentage + "%"}</span>
        <br />
        {renderMinutes(item?.value)} mn
        <br />
        {item?.label}
      </div>
    );
  };
  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center">
        <DaySelector
          items={days}
          selected={selectedDays}
          setSelected={setSelectedDays}
        />
        <div className="text-xl font-bold">Temps</div>
        <Button
          icon="pi pi-times"
          rounded
          aria-label="Cancel"
          className="w-1rem h-1rem p-1"
          pt={{
            icon: {
              className: "text-xs",
            },
          }}
        />
      </div>
      <div className="py-6 px-4">
        <MeterGroup
          data={renderProductivityTimes}
          orientation="horizontal"
          legend={false}
          labelTemplate={labelTemplate}
        />
      </div>
      <div className="py-6 ">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
      <div className="px-4 grid">
        <div className="col-3">
          <OperatorList />
        </div>
        <div className="col-9">
          <OperatorRepetition />
        </div>
      </div>
    </div>
  );
};

export default Temps;
