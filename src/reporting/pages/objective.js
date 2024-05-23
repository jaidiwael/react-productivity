import React, { useState, useEffect, useMemo } from "react";
import { Chart } from "primereact/chart";
import { SelectButton } from "primereact/selectbutton";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

import InternHeader from "../components/intern-header";
import ObjectiveCardActivity from "../components/objective-card-activity";

import { getProductivityDetailGoals } from "../api";

const dataSetConfig = {
  barThickness: 20,
  borderRadius: {
    topLeft: 20,
    topRight: 20,
    bottomLeft: 20,
    bottomRight: 20,
  },
};

const arrayColors = ["#54e392", " #64a0f8", "#8782dc", "#4ec6e2"];

const Objective = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [activity, setActivity] = useState(null);
  const [rangeDate, setRangeDate] = useState([
    moment().add(-7, "days").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ]);
  const [timeRange, setTimeRange] = useState(1);

  const { data: productivityDetailGoals } = useQuery({
    queryKey: ["getProductivityDetailGoals", rangeDate[0], rangeDate[1]],
    queryFn: getProductivityDetailGoals,
    enabled: !!rangeDate,
  });

  const renderDataOptions = useMemo(() => {
    let newActivities = {};
    let newLabels = [];
    const groupedLabels = Object.groupBy(
      productivityDetailGoals?.totalGoalsDetail || [],
      ({ dateCreation }) => dateCreation
    );
    const labels = Object.keys(groupedLabels)?.sort();

    switch (timeRange) {
      case 3:
        labels.forEach((lb, index) => {
          const month = moment(lb).month();
          if (newLabels.find((l) => l === month)) {
            debugger;
            productivityDetailGoals?.totalGoals?.forEach(({ domainName }) => {
              debugger;
              let domain = newActivities[domainName];
              const findActivity = groupedLabels?.[lb]?.find(
                (actL) => domainName === actL?.domainName
              );
              const value = findActivity
                ? findActivity?.productivityRatioPcent
                : 0;
              if (domain) {
                domain[domain?.length - 1] = domain[domain?.length - 1] + value;
              } else {
                domain = [];
                domain[0] = value;
              }
              newActivities = {
                ...newActivities,
                [domainName]: domain,
              };
            });
          } else {
            debugger;
            newLabels = [...newLabels, month];
            productivityDetailGoals?.totalGoals?.forEach(({ domainName }) => {
              debugger;
              let domain = newActivities[domainName];
              const findActivity = groupedLabels?.[lb]?.find(
                (actL) => domainName === actL?.domainName
              );
              const value = findActivity
                ? findActivity?.productivityRatioPcent
                : 0;
              if (domain) {
                domain = [...domain, value];
              } else {
                domain = [];
                domain[0] = value;
              }
              newActivities = {
                ...newActivities,
                [domainName]: domain,
              };
            });
          }
        });
        newLabels = newLabels.map((lb) => `Mois ${lb}`);
        break;
      case 2:
        labels.forEach((lb, index) => {
          const week = moment(lb).week();
          if (newLabels.find((l) => l === week)) {
            debugger;
            productivityDetailGoals?.totalGoals?.forEach(({ domainName }) => {
              debugger;
              let domain = newActivities[domainName];
              const findActivity = groupedLabels?.[lb]?.find(
                (actL) => domainName === actL?.domainName
              );
              const value = findActivity
                ? findActivity?.productivityRatioPcent
                : 0;
              if (domain) {
                domain[domain?.length - 1] = domain[domain?.length - 1] + value;
              } else {
                domain = [];
                domain[0] = value;
              }
              newActivities = {
                ...newActivities,
                [domainName]: domain,
              };
            });
          } else {
            debugger;
            newLabels = [...newLabels, week];
            productivityDetailGoals?.totalGoals?.forEach(({ domainName }) => {
              debugger;
              let domain = newActivities[domainName];
              const findActivity = groupedLabels?.[lb]?.find(
                (actL) => domainName === actL?.domainName
              );
              const value = findActivity
                ? findActivity?.productivityRatioPcent
                : 0;
              if (domain) {
                domain = [...domain, value];
              } else {
                domain = [];
                domain[0] = value;
              }
              newActivities = {
                ...newActivities,
                [domainName]: domain,
              };
            });
          }
        });

        newLabels = newLabels.map((lb) => `Semaine ${lb}`);
        break;
      case 1:
      default:
        newLabels = labels;
        productivityDetailGoals?.totalGoals?.forEach(({ domainName }) => {
          newActivities = {
            ...newActivities,
            [domainName]: labels?.map((label) => {
              const findActivity = groupedLabels?.[label]?.find(
                (actL) => domainName === actL?.domainName
              );
              return findActivity ? findActivity?.productivityRatioPcent : 0;
            }),
          };
        });
        break;
    }
    return {
      labels: newLabels,
      ...newActivities,
    };
  }, [productivityDetailGoals, timeRange]);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );

    let datasets = productivityDetailGoals?.totalGoals?.map(
      ({ domainName, domainId, domainColor }) => {
        let extraOption = {};
        if (activity === domainId) {
          extraOption = {
            borderColor: domainColor,
            backgroundColor: domainColor,
            borderWidth: 4,
          };
        }
        return {
          ...dataSetConfig,
          id: domainId,
          label: domainName,
          borderColor: "#6185A2",
          backgroundColor: "#6185A2",
          data: renderDataOptions?.[domainName],
          fill: false,
          ...extraOption,
        };
      }
    );

    if (activity) {
      datasets = datasets?.filter((ds) => ds.id === activity);
    }

    const data = {
      labels: renderDataOptions?.labels,
      datasets,
    };
    const options = {
      tension: 0.4,
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
          ticks: {
            color: textColorSecondary,
          },
        },
        y: {
          border: {
            color: "#fff",
            dash: [1],
          },

          ticks: {
            color: "#fff",
            stepSize: 20,
          },

          grid: {
            color: "#fff",
            tickBorderDash: [1],
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [activity, renderDataOptions, productivityDetailGoals]);

  const renderDomainsCard = useMemo(() => {
    return productivityDetailGoals?.totalGoals?.map(
      ({ domainColor, domainName, productivityRatioPcent, domainId }) => {
        return (
          <ObjectiveCardActivity
            id={domainId}
            title={domainName}
            value={productivityRatioPcent}
            displayLabel={false}
            headerBgColor={domainColor}
            className={"mb-3"}
            onClick={(id) => {
              if (activity === id) {
                setActivity(null);
              } else {
                setActivity(id);
              }
            }}
            activeItem={activity}
          />
        );
      }
    );
  }, [productivityDetailGoals, activity]);

  return (
    <div className="p-4 bg-blue-900 h-screen flex flex-column">
      <InternHeader defaultPage="objective" onRangeDate={setRangeDate} />
      <div className="px-4 flex gap-3" style={{ height: "calc(100% - 39px)" }}>
        <div className="objective-page__left-col h-full">
          <div className="h-full overflow-auto">{renderDomainsCard}</div>
        </div>
        <div className="objective-page__right-col h-full">
          <div className="py-3 px-3 flex flex-column h-full bg-blue-800 border-round-2xl shadow-1 flex-grow-1">
            {/* <div className="text-white  flex justify-content-end">
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
            </div> */}

            <Chart
              type="line"
              data={chartData}
              options={chartOptions}
              style={{ height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Objective;
