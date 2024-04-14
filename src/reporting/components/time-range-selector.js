import { Button } from "primereact/button";

const TimeRangeSelector = ({ options, selected, setSelected }) => {
  return (
    <div className="flex">
      {options?.map((option, index) => {
        return (
          <Button
            key={index}
            label={option}
            rounded={selected === option}
            text={selected !== option}
            onClick={setSelected}
            size="small"
            className={`py-2 ${
              selected === option ? "bg-gray-200 text-color" : "text-gray-200"
            }`}
          />
        );
      })}
    </div>
  );
};
export default TimeRangeSelector;
