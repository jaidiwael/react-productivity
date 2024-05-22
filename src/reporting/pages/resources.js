import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Chart } from "primereact/chart";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useParams, useNavigate } from "react-router-dom";

// import ChargeProductivityChart from "../components/charge-productivity-chart";
import InternHeader from "../components/intern-header";
import ChargeActivityTable from "../components/charge-activity-table";

import { customOrder } from "../helpers";
import {
  getProductivityDetailProd,
  getProductivityDetailRessources,
} from "../api";

const Resources = () => {
  const [selectedClient, setSelectedClient] = useState();
  // const [selectedOperator, setSelectedOperator] = useState();
  const [rangeDate, setRangeDate] = useState([
    moment().add(-7, "days").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ]);

  const navigate = useNavigate();

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = "rgba(255,255,255,1";
  const textColorSecondary = documentStyle.getPropertyValue("--gray-100");
  const surfaceBorder = "rgba(255,255,255,0.4)";

  const { activityId } = useParams();

  const diffDays = useMemo(() => {
    const firstDay = moment(rangeDate[1]);
    const secondDay = moment(rangeDate[0]);
    return firstDay.diff(secondDay, "days");
  }, [rangeDate]);

  const { data: productivityDetailRessources } = useQuery({
    queryKey: [
      "getProductivityDetailRessources",
      rangeDate[0],
      rangeDate[1],
      activityId,
    ],
    queryFn: getProductivityDetailRessources,
  });

  const renderDataOptions = useMemo(() => {
    let newLabels = [];
    let newReel = [];
    let newPlanifier = [];
    if (productivityDetailRessources) {
      const orderList = productivityDetailRessources?.domainStats?.sort(
        customOrder("date", "asc")
      );

      newLabels = orderList?.map(({ date }) => date);
      newReel = orderList?.map(({ realEtp }) => realEtp);
      newPlanifier = orderList?.map(({ capaETP }) => capaETP);
    }
    return {
      labels: newLabels,
      reel: newReel,
      planifier: newPlanifier,
    };
  }, [productivityDetailRessources]);

  const chartData = {
    labels: renderDataOptions?.labels,
    datasets: [
      {
        label: "ETP plannifié",
        backgroundColor: documentStyle.getPropertyValue("--cyan-300"),
        borderColor: documentStyle.getPropertyValue("--cyan-300"),
        data: renderDataOptions?.planifier,
        barThickness: 20,
        tension: 0.4,
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
        data: renderDataOptions?.reel,
        barThickness: 20,
        tension: 0.4,
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
        display: diffDays <= 7,
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

  const { data: productivityDetailProd } = useQuery({
    queryKey: ["getProductivityDetailProd", "2024-05-01", "2024-05-08", 1],
    queryFn: getProductivityDetailProd,
  });

  // useEffect(() => {
  //   setSelectedActivity(parseInt(activityId));
  // }, [activityId]);

  const renderDomains = useMemo(() => {
    if (productivityDetailRessources) {
      return productivityDetailRessources?.domains.map(
        ({ domainId, domainName, domainColor, totalCapaETP, totalRealEtp }) => {
          return {
            id: domainId,
            activity: domainName,
            productivity: totalRealEtp,
            performance: "+8%",
            objective: totalCapaETP,
            color: domainColor,
          };
        }
      );
    }
    return [];
  }, [productivityDetailRessources]);
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

  return (
    <div className="p-4 bg-blue-900 h-screen overflow-auto">
      <InternHeader onRangeDate={setRangeDate} defaultPage={"resources"} />
      <div className="flex">
        <div className="productivity__left-col p-1">
          <ChargeActivityTable
            firstColumn={{ field: "activity", header: "Activités" }}
            selectedRow={+activityId}
            onRowSelection={(activityId) => {
              navigate(`/resources/${activityId}`);
              setSelectedClient(null);
              //setSelectedOperator(null);
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
            />
          </div>
        </div>
        <div className="productivity__right-col p-1">
          <div className="bg-blue-800 border-round-2xl px-3 py-2">
            <Chart
              type={`${diffDays > 7 ? "line" : "bar"}`}
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
