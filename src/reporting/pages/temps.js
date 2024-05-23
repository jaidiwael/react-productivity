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
  //type: "bar",
  barThickness: 20,
  tension: 0.4,
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
    let labels = [];
    let activities = {};
    if (selectedOperator) {
      const groupedLabels = Object.groupBy(
        productivityDetailTimes?.TotalTimeDetailByOperators?.filter(
          (opDate) => opDate?.operatorWmsId === selectedOperator.id
        ) || [],
        ({ dateCreation }) => dateCreation
      );
      labels = Object.keys(groupedLabels)?.sort();
      productivityDetailTimes?.TotalTimeGlobal?.forEach((act) => {
        activities = {
          ...activities,
          [`${act?.trackingTypeName}_values`]: labels?.map((label) => {
            const findActivity = groupedLabels?.[label]?.find(
              (actL) => act?.trackingTypeName === actL?.trackingTypeName
            );
            return findActivity
              ? Math.floor(findActivity?.TotalTimePassedByTrackingType / 60)
              : 0;
          }),
          [`${act?.trackingTypeName}_percent`]: labels?.map((label) => {
            const findActivity = groupedLabels?.[label]?.find(
              (actL) => act?.trackingTypeName === actL?.trackingTypeName
            );
            return findActivity ? findActivity?.percentage : 0;
          }),
        };
      });
    } else {
      labels = productivityDetailTimes?.TotalTimeDetail?.filter(
        (pdt) =>
          pdt?.trackingTypeName ===
          productivityDetailTimes?.TotalTimeGlobal?.[0]?.trackingTypeName
      )
        ?.sort(customOrder("dateCreation", "asc"))
        .map((pdt) => pdt?.dateCreation);
      productivityDetailTimes?.TotalTimeGlobal?.forEach((act) => {
        const activity = productivityDetailTimes?.TotalTimeDetail?.filter(
          (pdt) => pdt?.trackingTypeName === act?.trackingTypeName
        )?.sort(customOrder("dateCreation", "asc"));
        activities = {
          ...activities,
          [`${act?.trackingTypeName}_values`]: activity?.map((av) =>
            Math.floor(av?.TotalTimePassedByTrackingType / 60)
          ),
          [`${act?.trackingTypeName}_percent`]: activity?.map(
            (av) => av.percentage
          ),
        };
      });
    }

    return {
      labels,
      ...activities,
    };
  }, [productivityDetailTimes, selectedOperator]);

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
          borderColor: arrayColors?.find((c) => c?.label === activeItem?.label)
            ?.color,
          data:
            type === "percent"
              ? renderDataLabels?.[`${activeItem?.label}_percent`]
              : renderDataLabels?.[`${activeItem?.label}_values`],
          datalabels: {
            align: "end",
            display: diffDays <= 7,
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
          borderColor: arrayColors?.find(
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
      // aspectRatio: 0.8,
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
  }, [activeItem, type, renderDataLabels, rangeDate]);

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

  const getGroupedOperators = useMemo(() => {
    return Object.groupBy(
      productivityDetailTimes?.TotalTimeGlobalByOperators || [],
      ({ operatorWmsId }) => operatorWmsId
    );
  }, [productivityDetailTimes]);

  const renderOperators = useMemo(() => {
    return Object.keys(getGroupedOperators)?.map((operatorWmsId) => {
      return {
        id: operatorWmsId,
        operator: getGroupedOperators[operatorWmsId][0].operatorName,
      };
    });
  }, [getGroupedOperators]);

  const renderProductivityTimesByOperator = useMemo(() => {
    return getGroupedOperators?.[selectedOperator?.id]?.map(
      ({ TotalTimePassedByTrackingType, percentage, trackingTypeName }) => ({
        label: trackingTypeName,
        value: TotalTimePassedByTrackingType,
        percentage,
        color: arrayColors?.find((c) => c?.label === trackingTypeName)?.color,
      })
    );
  }, [getGroupedOperators, selectedOperator]);

  const diffDays = useMemo(() => {
    const firstDay = moment(rangeDate[1]);
    const secondDay = moment(rangeDate[0]);
    return firstDay.diff(secondDay, "days");
  }, [rangeDate]);

  return (
    <div className="p-4 bg-blue-900 h-screen flex flex-column">
      <InternHeader defaultPage="temps" onRangeDate={setRangeDate} />

      <div
        className="px-4 flex gap-3 flex-grow-1"
        style={{ height: "calc(100% - 80px)" }}
      >
        <div className="temps-page__left-col">
          <OperatorList
            onOperatorClick={(item) => {
              if (selectedOperator?.id === item.id) {
                setSelectedOperator(null);
              } else {
                setSelectedOperator(item);
              }
              setActiveItem(null);
            }}
            selectedOperator={selectedOperator}
            operators={renderOperators}
          />
        </div>
        <div className="temps-page__right-col h-full">
          <div className="flex flex-column h-full">
            <div className="py-4 px-4 bg-blue-800 border-round-2xl shadow-1 flex flex-column">
              <div className="text-white mb-6">Répartition du temps</div>
              <div className="flex-grow-1 align-items-center justify-content-center flex">
                <MeterGroup
                  data={
                    selectedOperator
                      ? renderProductivityTimesByOperator
                      : renderProductivityTimes
                  }
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
            <div
              className="py-3 px-4 bg-blue-800 border-round-2xl shadow-1 flex-grow-1 mt-3"
              style={{ maxHeight: "calc(100% - 158px)" }}
            >
              <div className="text-white mb-4">Evolution des temps</div>
              <Chart
                type={`${diffDays > 7 ? "line" : "bar"}`}
                data={chartData}
                options={chartOptions}
                plugins={[ChartDataLabels]}
                style={{
                  height: "calc(100% - 100px)",
                }}
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
