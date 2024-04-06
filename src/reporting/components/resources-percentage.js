import { Knob } from "primereact/knob";

const ResourcesPercentage = ({ value, label }) => {
  const renderColor = () => {
    if (value >= 90) {
      return "#d9342b";
    } else if (value >= 51) {
      return "#06b6d4";
    } else if (value >= 10) {
      return "#204887";
    } else {
      return "#212121";
    }
  };
  return (
    <div className="text-center">
      <div className="font-bold">{label}</div>
      <Knob
        value={value > 100 ? 100 : value}
        valueColor={renderColor()}
        rangeColor="#dcdfe2"
        valueTemplate={`${value}%`}
      />
    </div>
  );
};

export default ResourcesPercentage;
