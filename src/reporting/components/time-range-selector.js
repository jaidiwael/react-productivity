import { Button } from "primereact/button";

const TimeRangeSelector = ({ options, selected, setSelected }) => {
  return (
    <div className="flex gap-1">
      {options?.map((option, index) => {
        return (
          <Button
            key={index}
            label={option.label}
            rounded={true}
            text={selected !== option.value}
            onClick={() => setSelected(option.value)}
            size="small"
            className={`py-2 border-transparent ${
              selected === option.value
                ? "bg-gray-200 text-color"
                : "text-gray-200 bg-blue-800"
            }`}
          />
        );
      })}
    </div>
  );
};
export default TimeRangeSelector;
