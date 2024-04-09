import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { TabMenu } from "primereact/tabmenu";
import ProductivityDataTable from "../components/productivity-data-table";
import TimeRangeSelector from "../components/time-range-selector";
import ProductivityChart from "../components/productivity-chart";

const Productivity = () => {
  const [selectedActivity, setSelectedActivity] = useState();
  const [dropDownFilter, setDropDownFilter] = useState("productivity");
  return (
    <div className="p-4">
      <div className="flex justify-content-between mb-3">
        <div className="flex align-items-center gap-2">
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
                className: "text-primary",
              },
              trigger: {
                className: "text-primary",
              },
            }}
          />
          <TabMenu
            model={[
              { label: "Par Activité" },
              { label: "Par Opérateur" },
              { label: "Par Client" },
            ]}
          />
        </div>
        <div>
          <TimeRangeSelector
            options={["Hier", "7 derniers jours", "comule du mois", "3 mois"]}
            selected={"7 derniers jours"}
          />
          <div></div>
        </div>
      </div>
      <div className="grid">
        <div className="col-4">
          <ProductivityDataTable
            firstColumn={{ field: "activity", header: "Activités" }}
            selectedRow={selectedActivity}
            onRowSelection={setSelectedActivity}
            products={[
              {
                id: 1,
                activity: "Pinking",
                productivity: "120",
                performance: "+8%",
                objective: "100%",
              },
              {
                id: 2,
                activity: "Packing",
                productivity: "98",
                performance: "+2%",
                objective: "99%",
              },
              {
                id: 3,
                activity: "Emballage",
                productivity: "110",
                performance: "-2%",
                objective: "98%",
              },
              {
                id: 4,
                activity: "Reception",
                productivity: "80",
                performance: "-2%",
                objective: "90%",
              },
              {
                id: 5,
                activity: "Pinking",
                productivity: "120",
                performance: "+8%",
                objective: "100%",
              },
              {
                id: 6,
                activity: "Packing 1",
                productivity: "98",
                performance: "+2%",
                objective: "99%",
              },
            ]}
          />
          <div className="my-3">
            <ProductivityDataTable
              firstColumn={{ field: "client", header: "Clients" }}
              selectedRow={selectedActivity}
              onRowSelection={setSelectedActivity}
              products={[
                {
                  id: 1,
                  client: "name name",
                  productivity: "120",
                  performance: "+8%",
                  objective: "100%",
                },
                {
                  id: 2,
                  client: "name name",
                  productivity: "98",
                  performance: "+2%",
                  objective: "99%",
                },
                {
                  id: 3,
                  client: "name name",
                  productivity: "110",
                  performance: "-2%",
                  objective: "98%",
                },
                {
                  id: 4,
                  client: "name name",
                  productivity: "80",
                  performance: "-2%",
                  objective: "90%",
                },
                {
                  id: 5,
                  client: "name name",
                  productivity: "120",
                  performance: "+8%",
                  objective: "100%",
                },
                {
                  id: 6,
                  client: "name name",
                  productivity: "98",
                  performance: "+2%",
                  objective: "99%",
                },
              ]}
            />
          </div>
          <ProductivityDataTable
            firstColumn={{ field: "operator", header: "Operators" }}
            selectedRow={selectedActivity}
            onRowSelection={setSelectedActivity}
            products={[
              {
                id: 1,
                operator: "name name",
                productivity: "120",
                performance: "+8%",
                objective: "100%",
              },
              {
                id: 2,
                operator: "name name",
                productivity: "98",
                performance: "+2%",
                objective: "99%",
              },
              {
                id: 3,
                operator: "name name",
                productivity: "110",
                performance: "-2%",
                objective: "98%",
              },
              {
                id: 4,
                operator: "name name",
                productivity: "80",
                performance: "-2%",
                objective: "90%",
              },
              {
                id: 5,
                operator: "name name",
                productivity: "120",
                performance: "+8%",
                objective: "100%",
              },
              {
                id: 6,
                operator: "name name",
                productivity: "98",
                performance: "+2%",
                objective: "99%",
              },
            ]}
          />
        </div>
        <div className="col-8">
          <ProductivityChart />
        </div>
      </div>
    </div>
  );
};

export default Productivity;
