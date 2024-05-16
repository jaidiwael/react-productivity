import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Chart } from "primereact/chart";
import ChartDataLabels from "chartjs-plugin-datalabels";

// import ChargeProductivityChart from "../components/charge-productivity-chart";
import InternHeader from "../components/intern-header";
import ChargeActivityTable from "../components/charge-activity-table";

import { customOrder } from "../helpers";
import {
  getProductivityDetailProd,
  getProductivityHomeResources,
} from "../api";

const Resources = () => {
  const [selectedActivity, setSelectedActivity] = useState(1);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedOperator, setSelectedOperator] = useState();
  const [rangeDate, setRangeDate] = useState([
    moment().add(-7, "days").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ]);

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = "rgba(255,255,255,1";
  const textColorSecondary = documentStyle.getPropertyValue("--gray-100");
  const surfaceBorder = "rgba(255,255,255,0.4)";

  const { data: productivityHomeResources } = useQuery({
    queryKey: ["getProductivityHomeResources"],
    queryFn: getProductivityHomeResources,
  });

  const renderHomeResources = useMemo(() => {
    let values = null;
    if (productivityHomeResources) {
      let labels = [];
      let capaETPs = [];
      let realEtps = [];
      productivityHomeResources?.etp_list?.forEach(
        ({ dateCreation, capaETP, realEtp }) => {
          labels = [...labels, dateCreation];
          capaETPs = [...capaETPs, capaETP];
          realEtps = [...realEtps, realEtp];
        }
      );
      values = {
        labels,
        capaETPs,
        realEtps,
        ratiosList: productivityHomeResources?.ratios_list?.[0],
      };
    }
    return values;
  }, [productivityHomeResources]);

  const chartData = {
    labels: renderHomeResources?.labels,
    datasets: [
      {
        label: "ETP plannifié",
        backgroundColor: documentStyle.getPropertyValue("--cyan-300"),
        borderColor: documentStyle.getPropertyValue("--cyan-300"),
        data: renderHomeResources?.capaETPs,
        barThickness: 20,
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20,
        },
        datalabels: {
          align: "left",
        },
      },
      {
        label: "ETP réel",
        backgroundColor: documentStyle.getPropertyValue("--gray-100"),
        borderColor: documentStyle.getPropertyValue("--gray-100"),
        data: renderHomeResources?.realEtps,
        barThickness: 20,
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20,
        },
        datalabels: {
          align: "right",
        },
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.365,
    plugins: {
      legend: {
        position: "bottom",
        align: "end",
        labels: {
          usePointStyle: true,
          color: textColor,
          // pointStyle: "circle",
          padding: 10,
          boxHeight: 5,
          boxWidth: 5,
          font: {
            size: 10,
          },
        },
      },
      datalabels: {
        //clamp: true,
        anchor: "end", // Position of the labels (start, end, center, etc.)
        // align: "end", // Alignment of the labels (start, end, center, etc.)
        padding: {
          bottom: 30,
        },
        color: function (context) {
          return context.dataset.backgroundColor;
        },
        font: {
          weight: "bold",
          size: "10px",
        },
        formatter: function (value) {
          return value === 0 ? "" : value; // Display the actual data value
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        border: {
          color: surfaceBorder,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: true,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: "white",
          display: false,
          drawBorder: true,
        },
      },
    },
  };

  const activityId = selectedActivity;

  const { data: productivityDetailProd } = useQuery({
    queryKey: ["getProductivityDetailProd", "2024-05-01", "2024-05-08", 1],
    queryFn: getProductivityDetailProd,
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
      <InternHeader onRangeDate={setRangeDate} defaultPage={"resources"} />
      <div className="flex">
        <div className="productivity__left-col p-1">
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
          <div className="mt-3">
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
          </div>
        </div>
        <div className="productivity__right-col p-1">
          <div className="bg-blue-800 border-round-2xl px-3 py-2">
            <Chart
              type="bar"
              data={chartData}
              options={chartOptions}
              plugins={[ChartDataLabels]}
              // style={{ height: "295px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
