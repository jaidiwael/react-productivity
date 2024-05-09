import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import moment from "moment";

import TimeRangeSelector from "../components/time-range-selector";

const InternHeader = ({ defaultPage, onRangeDate }) => {
  const [dropDownFilter, setDropDownFilter] = useState(
    defaultPage || "productivity"
  );
  const [timeSelector, setTimeSelector] = useState(7);
  const [calendarPicker, setCalendarPicker] = useState(null);
  const navigate = useNavigate();

  const renderRange = useCallback((selector) => {
    switch (selector) {
      case 30:
        return [
          moment().startOf("month").format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD"),
        ];
      case 90:
        return [
          moment().add(-3, "months").format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD"),
        ];
      case 7:
      default:
        return [
          moment().add(-7, "days").format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD"),
        ];
    }
  }, []);
  return (
    <div className="flex justify-content-between mb-3 px-4 ">
      <div className="flex align-items-center gap-2">
        <i
          className="pi pi-home text-xl text-gray-200 cursor-pointer"
          onClick={() => navigate(`/`)}
        />
        <Dropdown
          value={dropDownFilter}
          onChange={(e) => setDropDownFilter(e.value)}
          options={[
            {
              label: "Productivité",
              value: "productivity",
            },
            {
              label: "Performance",
              value: "performance",
            },
            {
              label: "Temps",
              value: "Temps",
            },
            {
              label: "Objectif global",
              value: "Objective",
            },
            {
              label: "Charge",
              value: "Charge",
            },
          ]}
          className="w-14rem surface-100 border-round-3xl text-primary"
          pt={{
            input: {
              className: "py-2 text-center",
            },
          }}
        />
      </div>
      <div className="flex align-items-center gap-2">
        <TimeRangeSelector
          options={[
            { label: "7 derniers jours", value: 7 },
            { label: "cumule du mois", value: 30 },
            { label: "3 mois", value: 90 },
          ]}
          selected={timeSelector}
          setSelected={(v) => {
            setTimeSelector(v);
            setCalendarPicker(null);
            onRangeDate(renderRange(v));
          }}
        />
        {/* <div className="text-sm flex align-items-center gap-2 py-1 px-3 border-round-3xl bg-white-alpha-10 text-gray-200">
      2 mars <span className="pi pi-angle-right" />8 mars
    </div> */}
        <Calendar
          value={calendarPicker}
          onChange={(e) => {
            setCalendarPicker(e.value);
            setTimeSelector(null);
            if (e.value[1]) {
              onRangeDate([
                moment(e.value[0]).format("YYYY-MM-DD"),
                moment(e.value[1]).format("YYYY-MM-DD"),
              ]);
            }
          }}
          selectionMode="range"
          readOnlyInput
          hideOnRangeSelection
          placeholder="Selectionner une date"
          icon="pi pi-calendar"
          showIcon={true}
          locale="fr"
          pt={{
            input: {
              root: {
                className:
                  "border-round-3xl bg-blue-800 text-gray-200 p-button-label",
                style: {
                  height: "35.5px",
                  border: "none",
                  fontSize: "0.875rem",
                  width: "230px",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default InternHeader;
