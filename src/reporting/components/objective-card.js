import { Chart } from "primereact/chart";

import { doughnutOptions, plugin } from "../charts-options";

const ObjectiveCard = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border-round-2xl p-3 objective-card-background h-full flex flex-column justify-content-between cursor-pointer"
    >
      <div className="text-l text-white text-center">Objectif Global</div>
      <Chart
        type="doughnut"
        data={{
          datasets: [
            {
              id: "d1",
              data: [10, 90],
              backgroundColor: ["#2151D2", "#fff"],
              borderColor: ["#2151D2", "#fff"],
              spacing: 3,
              borderJoinStyle: "bevel",
              borderRadius: [50, 0],
              hoverBackgroundColor: ["red", "#fff"],
              borderDash: [10, 0],
              weight: 1,
              borderWidth: 0,
            },
          ],
        }}
        options={doughnutOptions}
        plugins={[plugin]}
        className="w-full"
      />
      <div className="text-3xl text-white text-center font-bold">110%</div>
    </div>
  );
};
export default ObjectiveCard;
