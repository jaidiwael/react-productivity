import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

import ChargeProductivityChart from "../components/charge-productivity-chart";
import InternHeader from "../components/intern-header";
import ChargeActivityTable from "../components/charge-activity-table";

import { customOrder } from "../helpers";
import { getProductivityDetailRealForecast } from "../api";

const Charge = () => {
  const [selectedActivity, setSelectedActivity] = useState(1);
  const [selectedClient, setSelectedClient] = useState();
  // const [selectedOperator, setSelectedOperator] = useState();
  const [rangeDate, setRangeDate] = useState([
    moment().add(-7, "days").format("YYYY-MM-DD"),
    moment().add(-1, "days").format("YYYY-MM-DD"),
  ]);

  //const navigate = useNavigate();
  const { activityId } = useParams();

  // const { data: productivityDetailProd } = useQuery({
  //   queryKey: ["getProductivityDetailProd", "2024-05-01", "2024-05-08", 1],
  //   queryFn: getProductivityDetailProd,
  // });

  const { data: productivityDetailForecast } = useQuery({
    queryKey: [
      "getProductivityDetailRealForecast",
      rangeDate[0],
      rangeDate[1],
      activityId,
    ],
    queryFn: getProductivityDetailRealForecast,
  });

  useEffect(() => {
    setSelectedActivity(parseInt(activityId));
  }, [activityId]);

  const renderDomains = useMemo(() => {
    if (productivityDetailForecast) {
      return productivityDetailForecast?.TotalRealForecastDomains?.map(
        ({
          domainId,
          domainName,
          domainColor,
          forecastValueTotal,
          realValueTotal,
          alkiValueTotal,
          variation,
        }) => {
          return {
            id: domainId,
            activity: domainName,
            productivity: realValueTotal,
            performance: "+8%",
            volumes: forecastValueTotal,
            objective: forecastValueTotal,
            color: domainColor,
            variation,
          };
        }
      );
    }
    return [];
  }, [productivityDetailForecast]);
  const renderCustomers = useMemo(() => {
    if (productivityDetailForecast) {
      return productivityDetailForecast?.TotalRealForecastDomainsCustomers?.map(
        ({
          customerCode,
          customerName,
          forecastValue,
          realValue,
          alkiValue,
          variation,
        }) => {
          return {
            id: customerCode,
            client: customerName,
            productivity: realValue,
            performance: "+8%",
            volumes: forecastValue,
            objective: forecastValue,
            actId: 1,
            variation,
          };
        }
      );
    }
    return [];
  }, [productivityDetailForecast]);

  // const renderOperators = useMemo(() => {
  //   if (productivityDetailProd) {
  //     return productivityDetailProd?.operators
  //       ?.filter((op) => op?.customerCode === selectedClient)
  //       ?.map(
  //         ({
  //           operatorWmsId,
  //           operatorName,
  //           productivityTarget,
  //           realProductivity,
  //           totalQuantity,
  //         }) => {
  //           return {
  //             id: operatorWmsId,
  //             operator: operatorName,
  //             productivity: realProductivity,
  //             performance: "+8%",
  //             volumes: totalQuantity,
  //             objective: productivityTarget,
  //             clientId: selectedClient,
  //           };
  //         }
  //       );
  //   }
  //   return [];
  // }, [productivityDetailProd, selectedClient]);
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
            // setSelectedOperator(null);
          },
        },
      ];
    }
    // if (selectedOperator) {
    //   breadCrumbArray = [
    //     ...breadCrumbArray,
    //     {
    //       label: renderOperators?.find((act) => act?.id === selectedOperator)
    //         ?.operator,
    //       id: selectedClient,
    //       action: (id) => {
    //         // setSelectedClient(id);
    //       },
    //     },
    //   ];
    // }
    return breadCrumbArray;
  }, [selectedActivity, selectedClient, renderDomains, renderCustomers]);

  const renderLabels = useMemo(() => {
    if (productivityDetailForecast) {
      // if (selectedOperator) {
      //   return productivityDetailProd?.operatorStats
      //     ?.filter((op) => op?.operatorWmsId === selectedOperator)
      //     ?.sort(customOrder("date", "asc"))
      //     ?.map((opLabel) => opLabel?.date);
      // } else
      if (selectedClient) {
        return productivityDetailForecast?.DetailRealForecastDomainsCustomers?.filter(
          (clt) => clt?.customerCode === selectedClient
        )
          ?.sort(customOrder("date", "asc"))
          ?.map((cltLabel) => cltLabel?.date);
      } else {
        return (
          productivityDetailForecast?.DetailRealForecastDomains
            // ?.filter((dm) => dm?.customerCode === selectedClient)
            ?.sort(customOrder("date", "asc"))
            ?.map((dmLabel) => dmLabel?.date)
        );
      }
    }
    return [];
  }, [selectedClient, productivityDetailForecast]);

  const renderCibleData = useMemo(() => {
    if (productivityDetailForecast) {
      // if (selectedOperator) {
      //   return productivityDetailProd?.operatorStats
      //     ?.filter((op) => op?.operatorWmsId === selectedOperator)
      //     ?.sort(customOrder("date", "asc"))
      //     ?.map((opLabel) => opLabel?.productivityTarget);
      // } else
      if (selectedClient) {
        return productivityDetailForecast?.DetailRealForecastDomainsCustomers?.filter(
          (clt) => clt?.customerCode === selectedClient
        )
          ?.sort(customOrder("date", "asc"))
          ?.map((cltLabel) => cltLabel?.forecastValue);
      } else {
        return (
          productivityDetailForecast?.DetailRealForecastDomains
            // ?.filter((dm) => dm?.customerCode === selectedClient)
            ?.sort(customOrder("date", "asc"))
            ?.map((cltLabel) => cltLabel?.forecastValue)
        );
      }
    }
    return [];
  }, [productivityDetailForecast, selectedClient]);
  const renderRealData = useMemo(() => {
    if (productivityDetailForecast) {
      // if (selectedOperator) {
      //   return productivityDetailProd?.operatorStats
      //     ?.filter((op) => op?.operatorWmsId === selectedOperator)
      //     ?.sort(customOrder("date", "asc"))
      //     ?.map((opLabel) => opLabel?.realProductivity);
      // } else
      if (selectedClient) {
        return productivityDetailForecast?.DetailRealForecastDomainsCustomers?.filter(
          (clt) => clt?.customerCode === selectedClient
        )
          ?.sort(customOrder("date", "asc"))
          ?.map((cltLabel) => cltLabel?.realValue);
      } else {
        return (
          productivityDetailForecast?.DetailRealForecastDomains
            // ?.filter((dm) => dm?.customerCode === selectedClient)
            ?.sort(customOrder("date", "asc"))
            ?.map((cltLabel) => cltLabel?.realValue)
        );
      }
    }
    return [];
  }, [productivityDetailForecast, selectedClient]);
  // const renderRealEtp = useMemo(() => {
  //   if (productivityDetailProd) {
  //     if (selectedOperator) {
  //       return productivityDetailProd?.operatorStats
  //         ?.filter((op) => op?.operatorWmsId === selectedOperator)
  //         ?.sort(customOrder("date", "asc"))
  //         ?.map((opLabel) => opLabel?.totalQuantity);
  //     } else if (selectedClient) {
  //       return productivityDetailProd?.customerStats
  //         ?.filter((clt) => clt?.customerCode === selectedClient)
  //         ?.sort(customOrder("date", "asc"))
  //         ?.map((cltLabel) => cltLabel?.totalQuantity);
  //     } else {
  //       return (
  //         productivityDetailProd?.domainStats
  //           // ?.filter((dm) => dm?.customerCode === selectedClient)
  //           ?.sort(customOrder("date", "asc"))
  //           ?.map((cltLabel) => cltLabel?.totalQuantity)
  //       );
  //     }
  //   }
  //   return [];
  // }, [productivityDetailProd, selectedClient, selectedOperator]);
  // const renderPlannedEtp = useMemo(() => {
  //   if (productivityDetailProd) {
  //     if (selectedOperator) {
  //       return productivityDetailProd?.operatorStats
  //         ?.filter((op) => op?.operatorWmsId === selectedOperator)
  //         ?.sort(customOrder("date", "asc"))
  //         ?.map((opLabel) => opLabel?.productivityRatioPcent);
  //     } else if (selectedClient) {
  //       return productivityDetailProd?.customerStats
  //         ?.filter((clt) => clt?.customerCode === selectedClient)
  //         ?.sort(customOrder("date", "asc"))
  //         ?.map((cltLabel) => cltLabel?.productivityRatioPcent);
  //     } else {
  //       return (
  //         productivityDetailProd?.domainStats
  //           // ?.filter((dm) => dm?.customerCode === selectedClient)
  //           ?.sort(customOrder("date", "asc"))
  //           ?.map((dmLabel) => dmLabel?.productivityRatioPcent)
  //       );
  //     }
  //   }
  //   return [];
  // }, [productivityDetailProd, selectedClient, selectedOperator]);
  return (
    <div className="p-4 bg-blue-900 h-screen overflow-auto">
      <InternHeader onRangeDate={setRangeDate} defaultPage={"charge"} />
      <div className="flex" style={{ height: "calc(100% - 57px)" }}>
        <div className="productivity__left-col align-self-start p-1 h-full">
          <div style={{ height: "calc(33%)" }}>
            <ChargeActivityTable
              firstColumn={{ field: "activity", header: "Activités" }}
              selectedRow={+activityId}
              onRowSelection={(activityId) => {
                setSelectedActivity(activityId);
                setSelectedClient(null);
                // setSelectedOperator(null);
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
                  className: "col-4 md:col-5 lg:col-3",
                  icon: "",
                },
                {
                  label: "Planifié",
                  value: "objective",
                  className: "col-4 md:col-2 lg:col-3",
                  icon: "",
                },
                // {
                //   label: "",
                //   value: "icon",
                //   className: "col-2",
                //   icon: "",
                // },
              ]}
            />
          </div>
          <div className="mt-3" style={{ height: "calc(66% - 10px)" }}>
            <ChargeActivityTable
              firstColumn={{ field: "client", header: "Client" }}
              selectedRow={selectedClient}
              onRowSelection={(clientId) => {
                setSelectedClient(clientId);
                // setSelectedOperator(null);
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
              withSearch
            />
          </div>
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
            // realEtp={renderRealEtp}
            // plannedEtp={renderPlannedEtp}
          />
        </div>
      </div>
    </div>
  );
};

export default Charge;
