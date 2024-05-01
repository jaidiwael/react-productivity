import MeterGroup from "./meter-group";

const TempsCard = ({ onClick, values }) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border-round-2xl py-2 px-4 h-full flex flex-column align-items-between gap-3 cursor-pointer"
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
