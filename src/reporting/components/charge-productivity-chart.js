import React, { useState, useEffect, useMemo } from "react";
import BreadCrumb from "./breadCrumb";
import { InputSwitch } from "primereact/inputswitch";
import { SelectButton } from "primereact/selectbutton";
import { Chart } from "primereact/chart";
import moment from "moment";

const ChargeProductivityChart = ({
  breadCrumb,
  activity,
  labels,
  cibleData,
  realData,
  realEtp,
  plannedEtp,
}) => {
  const [timeRange, setTimeRange] = useState(1);
  const [lineChartOptions, setLineChartOptions] = useState();
  const [mode, setMode] = useState("volume");
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = "rgba(255,255,255,1";
  const textColorSecondary = documentStyle.getPropertyValue("--gray-100");
  const surfaceBorder = "rgba(255,255,255,0.4)";
  const renderOptionsChart = useMemo(() => {
    let newLabels = [];
    let newCibleData = [];
    let newRealData = [];
    let newPlannedEtp = [];
    let newRealEtp = [];
    switch (timeRange) {
      case 3:
        labels.forEach((lb, index) => {
          const month = moment(lb).month();
          if (newLabels.find((l) => l === month)) {
            // newLabels[newLabels.length-1] =
            newCibleData[newCibleData.length - 1] =
              newCibleData[newCibleData.length - 1] + cibleData[index];
            newRealData[newRealData.length - 1] =
              newRealData[newRealData.length - 1] + realData[index];
            newPlannedEtp[newPlannedEtp.length - 1] =
              newPlannedEtp[newPlannedEtp.length - 1] + plannedEtp[index];
            newRealEtp[newRealEtp.length - 1] =
              newRealEtp[newRealEtp.length - 1] + realEtp[index];
          } else {
            newLabels = [...newLabels, month];
            newCibleData = [...newCibleData, cibleData[index]];
            newRealData = [...newRealData, realData[index]];
            newPlannedEtp = [...newPlannedEtp, plannedEtp[index]];
            newRealEtp = [...newRealEtp, realEtp[index]];
          }
        });
        newLabels = newLabels.map((lb) => `Mois ${lb}`);
        break;
      case 2:
        labels.forEach((lb, index) => {
          const week = moment(lb).week();
          if (newLabels.find((l) => l === week)) {
            // newLabels[newLabels.length-1] =
            newCibleData[newCibleData.length - 1] =
              newCibleData[newCibleData.length - 1] + cibleData[index];
            newRealData[newRealData.length - 1] =
              newRealData[newRealData.length - 1] + realData[index];
            newPlannedEtp[newPlannedEtp.length - 1] =
              newPlannedEtp[newPlannedEtp.length - 1] + plannedEtp[index];
            newRealEtp[newRealEtp.length - 1] =
              newRealEtp[newRealEtp.length - 1] + realEtp[index];
          } else {
            newLabels = [...newLabels, week];
            newCibleData = [...newCibleData, cibleData[index]];
            newRealData = [...newRealData, realData[index]];
            newPlannedEtp = [...newPlannedEtp, plannedEtp[index]];
            newRealEtp = [...newRealEtp, realEtp[index]];
          }
        });
        newLabels = newLabels.map((lb) => `Semaine ${lb}`);
        break;
      case 1:
      default:
        newLabels = labels;
        newCibleData = cibleData;
        newRealData = realData;
        newPlannedEtp = plannedEtp;
        newRealEtp = realEtp;
        break;
    }
    return {
      labels: newLabels,
      cibleData: newCibleData,
      realData: newRealData,
      plannedEtp: newPlannedEtp,
      realEtp: newRealEtp,
    };
  }, [cibleData, labels, plannedEtp, realEtp, realData, timeRange]);

  const lineChartData = {
    labels: renderOptionsChart?.labels,
    datasets: [
      {
        label: "Cible",
        data: renderOptionsChart?.cibleData,
        fill: false,
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue("--teal-300"),
      },
      {
        label: "Realisé",
        data: renderOptionsChart?.realData,
        fill: false,
        borderColor: documentStyle.getPropertyValue("--blue-500"),
        tension: 0.4,
        backgroundColor: "rgba(12, 105, 213,0.2)",
      },
    ],
  };

  useEffect(() => {
    setLineChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.418,
      plugins: {
        tooltip: {
          backgroundColor: activity?.color || "#fff",
        },
        legend: {
          position: "bottom",
          align: "end",
          labels: {
            usePointStyle: true,
            color: textColor,
            boxHeight: 5,
            boxWidth: 5,
            padding: 10,
            font: {
              size: 10,
            },
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

  return (
    <div className=" h-full flex flex-column">
      <div className="bg-blue-800 text-white border-round-2xl px-3 shadow-1">
        <div
          className=" text-white text-center -mx-3 p-2 border-round-top-2xl mb-3"
          style={{
            backgroundColor: activity?.color,
          }}
        >
          <BreadCrumb items={breadCrumb} />
        </div>

        <div className="text-white flex justify-content-between">
          <div className="flex align-items-center gap-2">
            <span>Volume</span>
            <InputSwitch
              checked={mode === "fiabilité"}
              onChange={() =>
                setMode(mode === "fiabilité" ? "volume" : "fiabilité")
              }
            />
            <span>Fiabilité</span>
          </div>
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
    </div>
  );
};
export default ChargeProductivityChart;

ChargeProductivityChart.defaultProps = {
  award: "best",
  breadCrumb: [{ label: "Réception", action: () => {} }],
};
