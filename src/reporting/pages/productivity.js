import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

import ProductivityDataTable from "../components/productivity-data-table";
import ProductivityChart from "../components/productivity-chart";
import InternHeader from "../components/intern-header";

import { customOrder } from "../helpers";
import { getProductivityDetailProd } from "../api";

const Productivity = () => {
  const [selectedActivity, setSelectedActivity] = useState(1);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedOperator, setSelectedOperator] = useState();
  const [rangeDate, setRangeDate] = useState([
    moment().add(-7, "days").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ]);

  const navigate = useNavigate();
  const { activityId } = useParams();

  const { data: productivityDetailProd } = useQuery({
    queryKey: [
      "getProductivityDetailProd",
      rangeDate[0],
      rangeDate[1],
      activityId,
    ],
    queryFn: getProductivityDetailProd,
    enabled: !!rangeDate,
  });

  useEffect(() => {
    setSelectedActivity(parseInt(activityId));
  }, [activityId]);

  const renderDomains = useMemo(() => {
    if (productivityDetailProd) {
      return productivityDetailProd?.domains?.map(
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
      return productivityDetailProd?.customers?.map(
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
      <InternHeader onRangeDate={setRangeDate} defaultPage={"productivity"} />
      <div className="flex">
        <div className="productivity__left-col p-1">
          <ProductivityDataTable
            firstColumn={{ field: "activity", header: "Activités" }}
            selectedRow={+activityId}
            onRowSelection={(activityId) => {
              //  setSelectedActivity(activityId);
              navigate(`/productivity/${activityId}`);
              setSelectedClient(null);
              setSelectedOperator(null);
            }}
            products={renderDomains}
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
              products={renderCustomers}
              blueTheme
              selectedColor={
                renderDomains?.find((act) => act?.id === +activityId)?.color
              }
            />
          </div>
          {selectedClient && (
            <div className="mt-3">
              <ProductivityDataTable
                firstColumn={{ field: "operator", header: "Operator" }}
                selectedRow={selectedOperator}
                onRowSelection={setSelectedOperator}
                products={renderOperators}
                blueTheme
                selectedColor={
                  renderDomains?.find((act) => act?.id === +activityId)?.color
                }
              />
            </div>
          )}
        </div>
        <div className="productivity__right-col p-1">
          <ProductivityChart
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

export default Productivity;
