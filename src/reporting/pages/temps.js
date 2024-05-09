import React, { useState, useEffect, useMemo } from "react";
import { Chart } from "primereact/chart";
import { useQuery } from "@tanstack/react-query";
import { RadioButton } from "primereact/radiobutton";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";

import MeterGroup from "../components/meter-group";
import OperatorList from "../components/operator-list";

import { getProductivityDetailTimes } from "../api";
import { arrayColors, customOrder } from "../helpers";
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
  const [rangeDate, setRangeDate] = useState([
    moment().add(-7, "days").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ]);

  const { data: productivityDetailTimes } = useQuery({
    queryKey: ["getProductivityDetailTimes", rangeDate[0], rangeDate[1]],
    queryFn: getProductivityDetailTimes,
    enabled: !!rangeDate,
  });

  const renderDataLabels = useMemo(() => {
    const labels = productivityDetailTimes?.TotalTimeDetail?.filter(
      (pdt) =>
        pdt?.trackingTypeName ===
        productivityDetailTimes?.TotalTimeGlobal?.[0]?.trackingTypeName
    )
      ?.sort(customOrder("dateCreation", "asc"))
      .map((pdt) => pdt?.dateCreation);

    let activities = {};

    productivityDetailTimes?.TotalTimeGlobal?.forEach((act) => {
      const activity = productivityDetailTimes?.TotalTimeDetail?.filter(
        (pdt) => pdt?.trackingTypeName === act?.trackingTypeName
      )?.sort(customOrder("dateCreation", "asc"));
      activities = {
        ...activities,
        [`${act?.trackingTypeName}_values`]: activity?.map(
          (av) => av.TotalTimePassedByTrackingType
        ),
        [`${act?.trackingTypeName}_percent`]: activity?.map(
          (av) => av.percentage
        ),
      };
    });

    return {
      labels,
      ...activities,
    };
  }, [productivityDetailTimes]);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    let datasets = [];
    if (activeItem) {
      datasets = [
        {
          ...dataSetConfig,
          label: activeItem.label,
          backgroundColor: arrayColors?.find(
            (c) => c?.label === activeItem?.label
          )?.color,
          data:
            type === "percent"
              ? renderDataLabels?.[`${activeItem?.label}_percent`]
              : renderDataLabels?.[`${activeItem?.label}_values`],
          datalabels: {
            align: "end",
          },
        },
      ];
    } else {
      datasets = productivityDetailTimes?.TotalTimeGlobal?.map((pdtttg) => {
        return {
          ...dataSetConfig,
          label: pdtttg?.trackingTypeName,
          backgroundColor: arrayColors?.find(
            (c) => c?.label === pdtttg?.trackingTypeName
          )?.color,
          data:
            type === "percent"
              ? renderDataLabels?.[`${pdtttg?.trackingTypeName}_percent`]
              : renderDataLabels?.[`${pdtttg?.trackingTypeName}_values`],
          datalabels: {
            display: false,
          },
        };
      });
    }

    const data = {
      labels: renderDataLabels?.labels,
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
  }, [activeItem, type, renderDataLabels]);

  const renderProductivityTimes = useMemo(() => {
    return productivityDetailTimes?.TotalTimeGlobal?.map(
      (
        { TotalTimePassedByTrackingType, percentage, trackingTypeName },
        index
      ) => ({
        label: trackingTypeName,
        value: TotalTimePassedByTrackingType,
        percentage,
        color: arrayColors?.find((c) => c?.label === trackingTypeName)?.color,
      })
    );
  }, [productivityDetailTimes]);

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
      <InternHeader defaultPage="Temps" onRangeDate={setRangeDate} />

      <div className="px-4 flex gap-3 flex-grow-1">
        <div className="temps-page__left-col">
          <OperatorList
            onOperatorClick={(item) => {
              setSelectedOperator(item);
              setActiveItem(null);
            }}
            selectedOperator={selectedOperator}
          />
        </div>
        <div className="temps-page__right-col h-full">
          <div className="flex flex-column h-full">
            <div className="py-3 px-4 bg-blue-800 border-round-2xl shadow-1 h-full flex flex-column">
              <div className="text-white">Répartition du temps</div>
              <div className="flex-grow-1 align-items-center justify-content-center flex">
                <MeterGroup
                  data={renderProductivityTimes}
                  orientation="horizontal"
                  legend={false}
                  labelTemplate={labelTemplate}
                  onItemClick={(act) => {
                    if (act?.label === activeItem?.label) {
                      setActiveItem(null);
                    } else {
                      setActiveItem(act);
                    }
                  }}
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
