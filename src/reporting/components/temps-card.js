import MeterGroup from "./meter-group";

const TempsCard = ({ onClick }) => {
  const values = [
    {
      label: "mn pick",
      value: "20",
      color: "blue",
    },
    {
      label: "mn Pack",
      value: "10",
      color: "red",
    },
    {
      label: "mn Support",
      value: "8",
      color: "pink",
    },
    {
      label: "mn Temps manquant",
      value: "8",
      color: "teal",
    },
  ];
  return (
    <div
      onClick={onClick}
      className="bg-card border-round-2xl py-3 px-4 h-full flex flex-column align-items-between gap-4 cursor-pointer"
    >
      <div className="text-white text-center font-semibold border-bottom-1 border-white-alpha-30 pb-2">
        Temps
      </div>
      <div className="flex-grow-1">
        <MeterGroup data={values} orientation="vertical" />
      </div>
    </div>
  );
};
export default TempsCard;
