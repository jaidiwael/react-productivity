import React, { useState, useEffect, useMemo } from "react";
import { Chart } from "primereact/chart";
import { useQuery } from "@tanstack/react-query";
import { RadioButton } from "primereact/radiobutton";
import ChartDataLabels from "chartjs-plugin-datalabels";

import MeterGroup from "../components/meter-group";
import OperatorList from "../components/operator-list";

import { getProductivityTimes } from "../api";
import { arrayColors } from "../helpers";
import InternHeader from "../components/intern-header";

const dataSetConfig = {
  type: "bar",
  barThickness: 20,
  borderRadius: {
    topLeft: 20,
    topRight: 20,
    bottomLeft: 20,
    bottomRight: 20,
  },
};

const Temps = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [type, setType] = useState("percent");
  const [selectedOperator, setSelectedOperator] = useState(null);

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
    let datasets = [];

    switch (activeItem?.label) {
      case "SUPPORT":
        datasets = [
          {
            ...dataSetConfig,
            label: activeItem.label,
            backgroundColor: arrayColors[0],
            data:
              type === "percent"
                ? [50, 25, 12, 48, 90, 76, 42]
                : [10, 25, 30, 48, 69, 76, 115],
            datalabels: {
              align: "end",
            },
          },
        ];
        break;
      case "TEMPS MANQUANT":
        datasets = [
          {
            ...dataSetConfig,
            label: activeItem.label,
            backgroundColor: arrayColors[1],
            data:
              type === "percent"
                ? [21, 84, 24, 75, 37, 65, 34]
                : [21, 84, 24, 75, 37, 65, 34],
            datalabels: {
              align: "end",
            },
          },
        ];
        break;
      case "PICK":
        datasets = [
          {
            ...dataSetConfig,
            label: activeItem.label,
            backgroundColor: arrayColors[2],
            data:
              type === "percent"
                ? [41, 52, 24, 74, 23, 21, 32]
                : [41, 52, 24, 74, 23, 21, 32],
            datalabels: {
              align: "end",
            },
          },
        ];
        break;
      case "PACK":
        datasets = [
          {
            ...dataSetConfig,
            label: activeItem.label,
            backgroundColor: arrayColors[3],
            data:
              type === "percent"
                ? [41, 52, 24, 74, 23, 21, 32]
                : [41, 52, 24, 74, 23, 21, 32],
            datalabels: {
              align: "end",
            },
          },
        ];
        break;
      default:
        datasets = [
          {
            ...dataSetConfig,
            label: "SUPPORT",
            backgroundColor: arrayColors[0],
            data:
              type === "percent"
                ? [50, 25, 12, 48, 90, 76, 42]
                : [10, 25, 30, 48, 69, 76, 115],
            datalabels: {
              display: false,
            },
          },
          {
            ...dataSetConfig,
            label: "TEMPS MANQUANT",
            backgroundColor: arrayColors[1],
            data:
              type === "percent"
                ? [21, 84, 24, 75, 37, 65, 34]
                : [21, 84, 24, 75, 37, 65, 34],
            datalabels: {
              display: false,
            },
          },
          {
            ...dataSetConfig,
            label: "PICK",
            backgroundColor: arrayColors[2],
            data:
              type === "percent"
                ? [41, 52, 24, 74, 23, 21, 32]
                : [41, 52, 24, 74, 23, 21, 32],
            datalabels: {
              display: false,
            },
          },
          {
            ...dataSetConfig,
            label: "PACK",
            backgroundColor: arrayColors[3],
            data:
              type === "percent"
                ? [41, 52, 24, 74, 23, 21, 32]
                : [41, 52, 24, 74, 23, 21, 32],
            datalabels: {
              display: false,
            },
          },
        ];
        break;
    }

    const data = {
      labels: ["v", "S", "D", "L", "M", "Me", "J"],
      datasets,
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
        datalabels: {
          //clamp: true,
          anchor: "end", // Position of the labels (start, end, center, etc.)
          // align: "end", // Alignment of the labels (start, end, center, etc.)
          padding: {
            bottom: 30,
          },
          color: "#fff",
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
          //  stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          // grid: {
          //   color: surfaceBorder,
          // },
        },
        y: {
          border: {
            color: "#fff",
            dash: [1],
          },
          //  stacked: true,
          ticks: {
            color: "#fff",
            stepSize: type === "percent" ? 10 : 20,
            callback: function (value, index, ticks) {
              return value + `${type === "percent" ? "%" : ""}`;
            },
          },
          min: 0,
          max: type === "percent" ? 100 : null,
          grid: {
            color: "#fff",
            tickBorderDash: [1],
            //tickBorderDashOffset: 100,
            // tickColor: "red",

            // z: 1,
            //offset: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [activeItem, type]);

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

  const labelTemplate = (item) => {
    return (
      <div
        className="text-white text-center "
        style={{
          fontSize: "0.65rem",
        }}
      >
        <span>
          {item?.percentage + "%"} {item?.label}
        </span>
      </div>
    );
  };
  return (
    <div className="p-4 bg-blue-900 h-screen flex flex-column">
      <InternHeader defaultPage="Temps" />

      <div className="px-4 grid flex-grow-1">
        <div className="col-3">
          <OperatorList
            onOperatorClick={(item) => {
              setSelectedOperator(item);
              setActiveItem(null);
            }}
            selectedOperator={selectedOperator}
          />
        </div>
        <div className="col-9 h-full">
          <div className="flex flex-column h-full">
            <div className="py-3 px-4 bg-blue-800 border-round-2xl shadow-1 h-full flex flex-column">
              <div className="text-white">Répartition du temps</div>
              <div className="flex-grow-1 align-items-center justify-content-center flex">
                <MeterGroup
                  data={renderProductivityTimes}
                  orientation="horizontal"
                  legend={false}
                  labelTemplate={labelTemplate}
                  onItemClick={setActiveItem}
                  activeItem={activeItem}
                />
              </div>
            </div>
            <div className="py-3 px-4 bg-blue-800 border-round-2xl shadow-1 flex-grow-1 mt-3">
              <div className="text-white mb-7">Evolution des temps</div>
              <Chart
                type="bar"
                data={chartData}
                options={chartOptions}
                plugins={[ChartDataLabels]}
              />
              <div className="flex flex-column gap-2">
                <div className="flex align-items-center">
                  <RadioButton
                    inputId={"percent"}
                    name="type"
                    value={"percent"}
                    onChange={(e) => setType(e.value)}
                    checked={type === "percent"}
                  />
                  <label
                    htmlFor={"percent"}
                    className="ml-2 text-white text-sm"
                  >
                    Pourcentage
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId={"temps"}
                    name="type"
                    value={"temps"}
                    onChange={(e) => setType(e.value)}
                    checked={type === "temps"}
                  />
                  <label htmlFor={"temps"} className="ml-2 text-white text-sm">
                    Temps
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* <OperatorRepetition /> */}
        </div>
      </div>
    </div>
  );
};

export default Temps;
