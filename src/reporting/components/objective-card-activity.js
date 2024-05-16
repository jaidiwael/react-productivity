import { Chart } from "primereact/chart";

import {
  doughnutOptions,
  pluginImageTopCenter,
  customCanvasBackgroundColor,
  elementArcGradient,
} from "../charts-options";
import Logo from "../../assets/images/alki-logo.svg";
import { useMemo } from "react";

const ObjectiveCardActivity = ({
  title,
  onClick,
  value,
  className,
  headerClassName,
  activeItem,
  headerBgColor,
  id,
}) => {
  const renderChartDonuts = useMemo(() => {
    let plugins = [];
    let datasets = {};
    let extraOptions = {};
    if (value < 100) {
      plugins.push(customCanvasBackgroundColor);
      datasets = [
        {
          id: "d1",
          data: [value, 100 - value],
          backgroundColor: ["#1A39D1", "#555C86"],
          borderColor: ["#1A39D1", "#555C86"],
          spacing: 1,
          borderJoinStyle: "bevel",
          borderRadius: [50, 0],
          hoverBackgroundColor: ["#1A39D1", "#555C86"],
          borderDash: [10, 0],
          weight: 1,
          borderWidth: 0,
        },
      ];
    } else if (value === 100) {
      datasets = [
        {
          data: [value],
          backgroundColor: ["#54FCCF"],
          borderWidth: 0,
        },
      ];
    } else {
      extraOptions = elementArcGradient;
      datasets = [
        {
          data: [value],
          borderWidth: 0,
        },
      ];
    }
    return { plugins, extraOptions, datasets };
  }, [value]);

  return (
    <div
      onClick={() => onClick(id)}
      className={`border-round-2xl  bg-card  flex flex-column justify-content-between cursor-pointer overflow-hidden
        ${className} ${activeItem === id ? "bg-active-card" : ""}`}
    >
      <div
        className={`py-2 text-white text-center font-semibold  pb-2 `}
        style={{
          backgroundColor: headerBgColor,
        }}
      >
        {title}
      </div>
      <div className={`py-3 px-4 flex justify-content-center`}>
        <Chart
          type="doughnut"
          data={{
            datasets: renderChartDonuts.datasets,
          }}
          options={{ ...doughnutOptions, ...renderChartDonuts.extraOptions }}
          plugins={[pluginImageTopCenter(Logo), ...renderChartDonuts.plugins]}
          className="flex w-full flex-grow-1 align-items-center justify-content-center"
        />
      </div>
    </div>
  );
};
export default ObjectiveCardActivity;
