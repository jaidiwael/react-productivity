import MeterGroup from "./meter-group";

const TempsCard = ({ onClick, values }) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border-round-2xl p-3 h-full flex flex-column align-items-between gap-4 cursor-pointer"
    >
      <div className="text-l text-center border-bottom-1 border-200 pb-2">
        Temps
      </div>
      <div className="flex-grow-1">
        <MeterGroup data={values} orientation="vertical" />
      </div>
    </div>
  );
};
export default TempsCard;
