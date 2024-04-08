import { Dropdown } from "primereact/dropdown";

const DaySelector = ({ selected, setSelected, items }) => {
  return (
    <Dropdown
      value={selected}
      onChange={(e) => setSelected(e.value)}
      options={items}
      className="w-14rem border-1 border-200 border-round-3xl border-solid text-center"
    />
  );
};

export default DaySelector;
