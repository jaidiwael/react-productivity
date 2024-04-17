import { Chart } from "primereact/chart";

import { doughnutOptions, pluginImageCenter } from "../charts-options";
import Logo from "../../assets/images/alki-logo.svg";

const ObjectiveCard = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border-round-2xl py-3 px-4 bg-card h-full flex flex-column justify-content-between cursor-pointer"
    >
      <div className="text-white text-center font-semibold border-bottom-1 border-white-alpha-30 pb-2">
        Objectif Global
      </div>
      <Chart
        type="doughnut"
        data={{
          datasets: [
            {
              id: "d1",
              data: ["100"],
              backgroundColor: ["#35FBD0"],
              // borderColor: ["#2151D2", "#fff"],
              // spacing: 3,
              borderJoinStyle: "bevel",
              // borderRadius: [50, 0],
              hoverBackgroundColor: ["#35FBD0"],
              // borderDash: [10, 0],
              weight: 1,
              borderWidth: 0,
            },
          ],
        }}
        options={doughnutOptions}
        plugins={[pluginImageCenter(Logo)]}
        className="w-full"
      />
      <div className="text-3xl text-white text-center font-bold">100%</div>
    </div>
  );
};
export default ObjectiveCard;
