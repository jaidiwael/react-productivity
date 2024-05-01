import { Chart } from "primereact/chart";

import {
  doughnutOptions,
  pluginImageCenter,
  customCanvasBackgroundColor,
  elementArcGradient,
} from "../charts-options";
import Logo from "../../assets/images/alki-logo.svg";
import { useMemo } from "react";

const ObjectiveCard = ({
  title,
  onClick,
  value,
  displayLabel = true,
  className,
  headerClassName,
  containerClassName,
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
          data: [100],
          backgroundColor: ["#54FCCF"],
          borderWidth: 0,
        },
      ];
    } else {
      extraOptions = elementArcGradient;
      datasets = [
        {
          data: [100],
          borderWidth: 0,
        },
      ];
    }
    return { plugins, extraOptions, datasets };
  }, [value]);

  return (
    <div
      onClick={onClick}
      className={`border-round-2xl py-2 px-4 bg-card h-full flex flex-column justify-content-between cursor-pointer 
        ${className}`}
    >
      <div
        className={`text-white text-center font-semibold border-bottom-1 border-white-alpha-30 pb-2 ${headerClassName}`}
      >
        {title}
      </div>
      <div className={`px-5`}>
        <Chart
          type="doughnut"
          data={{
            datasets: renderChartDonuts.datasets,
          }}
          options={{ ...doughnutOptions, ...renderChartDonuts.extraOptions }}
          plugins={[pluginImageCenter(Logo), ...renderChartDonuts.plugins]}
          className="flex w-full flex-grow-1 align-items-center"
        />
      </div>

      {displayLabel && (
        <div className="text-3xl text-white text-center font-bold">
          {value}%
        </div>
      )}
    </div>
  );
};
export default ObjectiveCard;
