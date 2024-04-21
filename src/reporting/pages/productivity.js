import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useParams } from "react-router-dom";

import ProductivityDataTable from "../components/productivity-data-table";
import TimeRangeSelector from "../components/time-range-selector";
import ProductivityChart from "../components/productivity-chart";

import { activities } from "../helpers";

const Productivity = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState(1);
  const [selectedClient, setSelectedClient] = useState();
  const [dropDownFilter, setDropDownFilter] = useState("productivity");

  const { activityId } = useParams();

  console.log("ActivityId", activityId);

  useEffect(() => {
    setSelectedActivity(parseInt(activityId));
  }, [activityId]);

  const renderBreadCrumb = useMemo(() => {
    let breadCrumbArray = [
      {
        label: "Activity",
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
          label: "Client",
          id: selectedClient,
          action: (id) => {
            setSelectedClient(id);
          },
        },
      ];
    }
    return breadCrumbArray;
  }, [selectedActivity, selectedClient]);
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
            options={["Hier", "7 derniers jours", "comule du mois", "3 mois"]}
            selected={"7 derniers jours"}
          />
          <div className="text-sm flex align-items-center gap-2 py-1 px-3 border-round-3xl bg-white-alpha-10 text-gray-200">
            2 mars <span className="pi pi-angle-right" />8 mars
          </div>
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
            }}
            products={activities}
            blueTheme
          />
          <div className="mt-3">
            <ProductivityDataTable
              firstColumn={{ field: "client", header: "Client" }}
              selectedRow={selectedClient}
              onRowSelection={setSelectedClient}
              products={[
                {
                  id: 1,
                  client: "name name",
                  productivity: "120",
                  performance: "+8%",
                  volumes: "199 000",
                  objective: "100%",
                },
                {
                  id: 2,
                  client: "name name",
                  productivity: "98",
                  performance: "+2%",
                  volumes: "199 000",
                  objective: "99%",
                },
                {
                  id: 3,
                  client: "name name",
                  productivity: "110",
                  performance: "-2%",
                  volumes: "199 000",
                  objective: "98%",
                },
                {
                  id: 4,
                  client: "name name",
                  productivity: "80",
                  performance: "-2%",
                  volumes: "199 000",
                  objective: "90%",
                },
                {
                  id: 5,
                  client: "name name",
                  productivity: "120",
                  performance: "+8%",
                  volumes: "199 000",
                  objective: "100%",
                },
                {
                  id: 6,
                  client: "name name",
                  productivity: "98",
                  performance: "+2%",
                  volumes: "199 000",
                  objective: "99%",
                },
              ]}
              blueTheme
            />
          </div>
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
