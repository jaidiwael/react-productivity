import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

import ProductivityDataTable from "../components/productivity-data-table";
import ChargeProductivityChart from "../components/charge-productivity-chart";
import InternHeader from "../components/intern-header";
import ChargeActivityTable from "../components/charge-activity-table";

import { customOrder } from "../helpers";
import { getProductivityDetailProd } from "../api";

const Charge = () => {
  const [selectedActivity, setSelectedActivity] = useState(1);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedOperator, setSelectedOperator] = useState();
  const [rangeDate, setRangeDate] = useState([
    moment().add(-8, "days").format("YYYY-MM-DD"),
    moment().add(-1, "days").format("YYYY-MM-DD"),
  ]);

  //const navigate = useNavigate();
  //const { activityId } = useParams();
  const activityId = selectedActivity;

  const { data: productivityDetailProd } = useQuery({
    queryKey: ["getProductivityDetailProd", "2024-05-01", "2024-05-08", 1],
    queryFn: getProductivityDetailProd,
    // enabled: !!(rangeDate && activityId),
  });

  useEffect(() => {
    setSelectedActivity(parseInt(activityId));
  }, [activityId]);

  const renderDomains = useMemo(() => {
    if (productivityDetailProd) {
      return productivityDetailProd?.domains.map(
        ({
          domainId,
          domainName,
          domainColor,
          productivityTarget,
          realProductivity,
          totalQuantity,
        }) => {
          return {
            id: domainId,
            activity: domainName,
            productivity: realProductivity,
            performance: "+8%",
            volumes: totalQuantity,
            objective: productivityTarget,
            color: domainColor,
          };
        }
      );
    }
    return [];
  }, [productivityDetailProd]);
  const renderCustomers = useMemo(() => {
    if (productivityDetailProd) {
      return productivityDetailProd?.customers.map(
        ({
          customerCode,
          customerName,
          productivityTarget,
          realProductivity,
          totalQuantity,
        }) => {
          return {
            id: customerCode,
            client: customerName,
            productivity: realProductivity,
            performance: "+8%",
            volumes: totalQuantity,
            objective: productivityTarget,
            actId: 1,
          };
        }
      );
    }
    return [];
  }, [productivityDetailProd]);

  const renderOperators = useMemo(() => {
    if (productivityDetailProd) {
      return productivityDetailProd?.operators
        ?.filter((op) => op?.customerCode === selectedClient)
        ?.map(
          ({
            operatorWmsId,
            operatorName,
            productivityTarget,
            realProductivity,
            totalQuantity,
          }) => {
            return {
              id: operatorWmsId,
              operator: operatorName,
              productivity: realProductivity,
              performance: "+8%",
              volumes: totalQuantity,
              objective: productivityTarget,
              clientId: selectedClient,
            };
          }
        );
    }
    return [];
  }, [productivityDetailProd, selectedClient]);
  const renderBreadCrumb = useMemo(() => {
    let breadCrumbArray = [
      {
        label: renderDomains?.find((act) => act?.id === +selectedActivity)
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
          label: renderCustomers?.find((act) => act?.id === selectedClient)
            ?.client,
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
          label: renderOperators?.find((act) => act?.id === selectedOperator)
            ?.operator,
          id: selectedClient,
          action: (id) => {
            // setSelectedClient(id);
          },
        },
      ];
    }
    return breadCrumbArray;
  }, [
    selectedActivity,
    selectedClient,
    selectedOperator,
    renderDomains,
    renderCustomers,
    renderOperators,
  ]);

  const renderLabels = useMemo(() => {
    if (productivityDetailProd) {
      if (selectedOperator) {
        return productivityDetailProd?.operatorStats
          ?.filter((op) => op?.operatorWmsId === selectedOperator)
          ?.sort(customOrder("date", "asc"))
          ?.map((opLabel) => opLabel?.date);
      } else if (selectedClient) {
        return productivityDetailProd?.customerStats
          ?.filter((clt) => clt?.customerCode === selectedClient)
          ?.sort(customOrder("date", "asc"))
          ?.map((cltLabel) => cltLabel?.date);
      } else {
        return (
          productivityDetailProd?.domainStats
            // ?.filter((dm) => dm?.customerCode === selectedClient)
            ?.sort(customOrder("date", "asc"))
            ?.map((dmLabel) => dmLabel?.date)
        );
      }
    }
    return [];
  }, [productivityDetailProd, selectedClient, selectedOperator]);

  const renderCibleData = useMemo(() => {
    if (productivityDetailProd) {
      if (selectedOperator) {
        return productivityDetailProd?.operatorStats
          ?.filter((op) => op?.operatorWmsId === selectedOperator)
          ?.sort(customOrder("date", "asc"))
          ?.map((opLabel) => opLabel?.productivityTarget);
      } else if (selectedClient) {
        return productivityDetailProd?.customerStats
          ?.filter((clt) => clt?.customerCode === selectedClient)
          ?.sort(customOrder("date", "asc"))
          ?.map((cltLabel) => cltLabel?.productivityTarget);
      } else {
        return (
          productivityDetailProd?.domainStats
            // ?.filter((dm) => dm?.customerCode === selectedClient)
            ?.sort(customOrder("date", "asc"))
            ?.map((cltLabel) => cltLabel?.productivityTarget)
        );
      }
    }
    return [];
  }, [productivityDetailProd, selectedClient, selectedOperator]);
  const renderRealData = useMemo(() => {
    if (productivityDetailProd) {
      if (selectedOperator) {
        return productivityDetailProd?.operatorStats
          ?.filter((op) => op?.operatorWmsId === selectedOperator)
          ?.sort(customOrder("date", "asc"))
          ?.map((opLabel) => opLabel?.realProductivity);
      } else if (selectedClient) {
        return productivityDetailProd?.customerStats
          ?.filter((clt) => clt?.customerCode === selectedClient)
          ?.sort(customOrder("date", "asc"))
          ?.map((cltLabel) => cltLabel?.realProductivity);
      } else {
        return (
          productivityDetailProd?.domainStats
            // ?.filter((dm) => dm?.customerCode === selectedClient)
            ?.sort(customOrder("date", "asc"))
            ?.map((cltLabel) => cltLabel?.realProductivity)
        );
      }
    }
    return [];
  }, [productivityDetailProd, selectedClient, selectedOperator]);
  const renderRealEtp = useMemo(() => {
    if (productivityDetailProd) {
      if (selectedOperator) {
        return productivityDetailProd?.operatorStats
          ?.filter((op) => op?.operatorWmsId === selectedOperator)
          ?.sort(customOrder("date", "asc"))
          ?.map((opLabel) => opLabel?.totalQuantity);
      } else if (selectedClient) {
        return productivityDetailProd?.customerStats
          ?.filter((clt) => clt?.customerCode === selectedClient)
          ?.sort(customOrder("date", "asc"))
          ?.map((cltLabel) => cltLabel?.totalQuantity);
      } else {
        return (
          productivityDetailProd?.domainStats
            // ?.filter((dm) => dm?.customerCode === selectedClient)
            ?.sort(customOrder("date", "asc"))
            ?.map((cltLabel) => cltLabel?.totalQuantity)
        );
      }
    }
    return [];
  }, [productivityDetailProd, selectedClient, selectedOperator]);
  const renderPlannedEtp = useMemo(() => {
    if (productivityDetailProd) {
      if (selectedOperator) {
        return productivityDetailProd?.operatorStats
          ?.filter((op) => op?.operatorWmsId === selectedOperator)
          ?.sort(customOrder("date", "asc"))
          ?.map((opLabel) => opLabel?.productivityRatioPcent);
      } else if (selectedClient) {
        return productivityDetailProd?.customerStats
          ?.filter((clt) => clt?.customerCode === selectedClient)
          ?.sort(customOrder("date", "asc"))
          ?.map((cltLabel) => cltLabel?.productivityRatioPcent);
      } else {
        return (
          productivityDetailProd?.domainStats
            // ?.filter((dm) => dm?.customerCode === selectedClient)
            ?.sort(customOrder("date", "asc"))
            ?.map((dmLabel) => dmLabel?.productivityRatioPcent)
        );
      }
    }
    return [];
  }, [productivityDetailProd, selectedClient, selectedOperator]);
  return (
    <div className="p-4 bg-blue-900 h-screen overflow-auto">
      <InternHeader onRangeDate={setRangeDate} defaultPage={"charge"} />
      <div className="flex" style={{ height: "calc(100% - 57px)" }}>
        <div className="productivity__left-col align-self-start p-1">
          <ChargeActivityTable
            firstColumn={{ field: "activity", header: "Activités" }}
            selectedRow={+activityId}
            onRowSelection={(activityId) => {
              setSelectedActivity(activityId);
              setSelectedClient(null);
              setSelectedOperator(null);
            }}
            products={renderDomains}
            blueTheme
            columnConfig={[
              {
                label: "Activité",
                value: "activity",
                className: "col-4 md:col-3 lg:col-4 ",
                icon: "",
              },
              {
                label: "Réel",
                value: "productivity",
                className: "col-3 md:col-5 lg:col-3",
                icon: "",
              },
              {
                label: "Planifié",
                value: "objective",
                className: "col-3 md:col-2 lg:col-3",
                icon: "",
              },
              {
                label: "",
                value: "icon",
                className: "col-2",
                icon: "",
              },
            ]}
          />
          {/* <div className="mt-3">
            <ChargeActivityTable
              firstColumn={{ field: "client", header: "Client" }}
              selectedRow={selectedClient}
              onRowSelection={(clientId) => {
                setSelectedClient(clientId);
                setSelectedOperator(null);
              }}
              products={renderCustomers}
              blueTheme
              height={"430px"}
              selectedColor={
                renderDomains?.find((act) => act?.id === +activityId)?.color
              }
              columnConfig={[
                {
                  label: "Clients",
                  value: "client",
                  className: "col-4 md:col-3 lg:col-4 ",
                  icon: "",
                },
                {
                  label: "Réel",
                  value: "productivity",
                  className: "col-3 md:col-5 lg:col-3",
                  icon: "",
                },
                {
                  label: "Planifié",
                  value: "objective",
                  className: "col-3 md:col-2 lg:col-3",
                  icon: "",
                },
                {
                  label: "",
                  value: "icon",
                  className: "col-2",
                  icon: "",
                },
              ]}
            />
          </div> */}
        </div>
        <div className="productivity__right-col h-full p-1">
          <ChargeProductivityChart
            breadCrumb={renderBreadCrumb}
            activity={renderDomains?.find(
              (act) => act?.id === +selectedActivity
            )}
            labels={renderLabels}
            cibleData={renderCibleData}
            realData={renderRealData}
            realEtp={renderRealEtp}
            plannedEtp={renderPlannedEtp}
          />
        </div>
      </div>
    </div>
  );
};

export default Charge;
