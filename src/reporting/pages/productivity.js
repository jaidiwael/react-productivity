import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useParams } from "react-router-dom";
import { Calendar } from "primereact/calendar";

import ProductivityDataTable from "../components/productivity-data-table";
import TimeRangeSelector from "../components/time-range-selector";
import ProductivityChart from "../components/productivity-chart";

import { activities, clients, operators } from "../helpers";

const Productivity = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState(1);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedOperator, setSelectedOperator] = useState();
  const [dropDownFilter, setDropDownFilter] = useState("productivity");
  const [timeSelector, setTimeSelector] = useState(-1);
  const [calendarPicker, setCalendarPicker] = useState(null);

  const { activityId } = useParams();

  useEffect(() => {
    setSelectedActivity(parseInt(activityId));
  }, [activityId]);

  const renderBreadCrumb = useMemo(() => {
    let breadCrumbArray = [
      {
        label: activities?.find((act) => act?.id === selectedActivity)
          ?.activity,
        id: selectedActivity,
        action: (id) => {
          setSelectedActivity(id);
          setSelectedClient(null);
        },
      },
    ];
    if (selectedClient) {
      breadCrumbArray = [
        ...breadCrumbArray,
        {
          label: clients?.find((act) => act?.id === selectedClient)?.client,
          id: selectedClient,
          action: (id) => {
            setSelectedClient(id);
            setSelectedOperator(null);
          },
        },
      ];
    }
    if (selectedOperator) {
      breadCrumbArray = [
        ...breadCrumbArray,
        {
          label: operators?.find((act) => act?.id === selectedClient)?.operator,
          id: selectedClient,
          action: (id) => {
            // setSelectedClient(id);
          },
        },
      ];
    }
    return breadCrumbArray;
  }, [selectedActivity, selectedClient, selectedOperator]);
  return (
    <div className="p-4 bg-blue-900">
      <div className="flex justify-content-between mb-3">
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
            ]}
            className="w-14rem surface-100 border-round-3xl text-primary"
            pt={{
              input: {
                className: "py-2",
              },
            }}
          />
        </div>
        <div className="flex align-items-center gap-2">
          <TimeRangeSelector
            options={[
              { label: "Hier", value: -1 },
              { label: "7 derniers jours", value: 7 },
              { label: "comule du mois", value: 30 },
              { label: "3 mois", value: 90 },
            ]}
            selected={timeSelector}
            setSelected={(v) => {
              setTimeSelector(v);
              setCalendarPicker(null);
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
      <div className="grid">
        <div className="col-4">
          <ProductivityDataTable
            firstColumn={{ field: "activity", header: "Activités" }}
            selectedRow={selectedActivity}
            onRowSelection={(activityId) => {
              setSelectedActivity(activityId);
              setSelectedClient(null);
              setSelectedOperator(null);
            }}
            products={activities}
            blueTheme
          />
          <div className="mt-3">
            <ProductivityDataTable
              firstColumn={{ field: "client", header: "Client" }}
              selectedRow={selectedClient}
              onRowSelection={(clientId) => {
                setSelectedClient(clientId);
                setSelectedOperator(null);
              }}
              products={clients?.filter(
                (client) => client.actId === selectedActivity
              )}
              blueTheme
              selectedColor={
                activities?.find((act) => act?.id === selectedActivity)?.color
              }
            />
          </div>
          {selectedClient && (
            <div className="mt-3">
              <ProductivityDataTable
                firstColumn={{ field: "operator", header: "Operator" }}
                selectedRow={selectedOperator}
                onRowSelection={setSelectedOperator}
                products={operators?.filter(
                  (operator) => operator?.clientId === selectedClient
                )}
                blueTheme
                selectedColor={
                  activities?.find((act) => act?.id === selectedActivity)?.color
                }
              />
            </div>
          )}
        </div>
        <div className="col-8">
          <ProductivityChart
            breadCrumb={renderBreadCrumb}
            activity={activities?.find((act) => act?.id === selectedActivity)}
          />
        </div>
      </div>
    </div>
  );
};

export default Productivity;
