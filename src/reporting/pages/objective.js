import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { SelectButton } from "primereact/selectbutton";

import InternHeader from "../components/intern-header";
import ObjectiveCardActivity from "../components/objective-card-activity";

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
  const [timeFilter, setTimeFilter] = useState(2);

  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    let datasets = [
      {
        ...dataSetConfig,
        label: "Packing",
        borderColor: "#6185A2",
        backgroundColor: "#6185A2",
        data: [50, 25, 12, 48, 90, 76, 42],
        fill: false,
      },
      {
        ...dataSetConfig,
        label: "Picking",
        borderColor: "#6185A2",
        backgroundColor: "#6185A2",
        data: [21, 84, 24, 75, 37, 65, 34],
        fill: false,
      },
      {
        ...dataSetConfig,
        label: "Flashage",
        borderColor: "#6185A2",
        backgroundColor: "#6185A2",
        data: [41, 52, 24, 74, 23, 21, 32],
        fill: false,
      },
      {
        ...dataSetConfig,
        label: "Réception",
        borderColor: "#6185A2",
        backgroundColor: "#6185A2",
        data: [45, 52, 24, 68, 23, 37, 32],
        fill: false,
      },
    ];

    if (activity) {
      datasets = datasets
        .filter((ds) => ds.label === activity)
        .map((ds, index) => {
          return {
            ...ds,
            borderColor: arrayColors[index],
            backgroundColor: arrayColors[index],
            borderWidth: 4,
          };
        });
    }

    const data = {
      labels: ["v", "S", "D", "L", "M", "Me", "J"],
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
  }, [timeFilter, activity]);

  return (
    <div className="p-4 bg-blue-900 h-screen flex flex-column">
      <InternHeader defaultPage="Objective" />

      <div className="px-4 grid " style={{ height: "calc(100% - 39px)" }}>
        <div className="col-3 h-full">
          <div className="h-full overflow-scroll">
            <ObjectiveCardActivity
              title="Packing"
              value={110}
              displayLabel={false}
              headerClassName="bg-color-green"
              className={"mb-2"}
              onClick={setActivity}
              activeItem={activity}
            />

            <ObjectiveCardActivity
              title="Picking"
              value={100}
              displayLabel={false}
              headerClassName="bg-color-purple"
              className={"mb-2"}
              onClick={setActivity}
              activeItem={activity}
            />
            <ObjectiveCardActivity
              title="Flashage"
              value={95}
              displayLabel={false}
              headerClassName="bg-color-purple-light"
              className={"mb-2"}
              onClick={setActivity}
              activeItem={activity}
            />

            <ObjectiveCardActivity
              title="Réception"
              value={89}
              displayLabel={false}
              headerClassName="bg-color-blue-light"
              onClick={setActivity}
              activeItem={activity}
            />
          </div>
        </div>
        <div className="col-9 h-full">
          <div className="pt-6  pb-3 px-3 flex flex-column h-full bg-blue-800 border-round-2xl shadow-1 flex-grow-1">
            <div className="text-white  flex justify-content-end">
              <SelectButton
                allowEmpty={false}
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.value)}
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

            <Chart
              type="line"
              data={chartData}
              options={chartOptions}
              className=" flex-grow-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Objective;
