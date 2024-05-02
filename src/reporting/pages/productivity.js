import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import ProductivityDataTable from "../components/productivity-data-table";
import ProductivityChart from "../components/productivity-chart";
import InternHeader from "../components/intern-header";

import { activities, clients, operators } from "../helpers";

const Productivity = () => {
  const [selectedActivity, setSelectedActivity] = useState(1);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedOperator, setSelectedOperator] = useState();

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
    <div className="p-4 bg-blue-900 h-screen">
      <InternHeader />
      <div className="flex">
        <div className="productivity__left-col p-1">
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
        <div className="productivity__right-col p-1">
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
