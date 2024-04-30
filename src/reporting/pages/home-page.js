import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ChargeCard from "../components/charge-card";
import ObjectiveCard from "../components/objective-card";
import PerformanceSlider from "../components/performance-slider";
import ResourcesCard from "../components/resources-card";
import TempsCard from "../components/temps-card";

import {
  getProductivityTimes,
  getProductivityRealForecast,
  getProductivityHomeResources,
  getProductivityHomeProdvalues,
} from "../api";
import { arrayColors } from "../helpers";

const HomePage = () => {
  const navigate = useNavigate();
  const { data: productivityTimes } = useQuery({
    queryKey: ["getProductivityTimes"],
    queryFn: getProductivityTimes,
  });

  const { data: productivityRealForecast } = useQuery({
    queryKey: ["getProductivityRealForecast"],
    queryFn: getProductivityRealForecast,
  });

  const { data: productivityHomeResources } = useQuery({
    queryKey: ["getProductivityHomeResources"],
    queryFn: getProductivityHomeResources,
  });

  const { data: productivityHomeProdvalues } = useQuery({
    queryKey: ["getProductivityDomain"],
    queryFn: getProductivityHomeProdvalues,
  });

  const renderProductivityTimes = useMemo(() => {
    return (
      productivityTimes
        // ?.sort(function (a, b) {
        //   if (a.name < b.name) {
        //     return -1;
        //   }
        //   if (a.name > b.name) {
        //     return 1;
        //   }
        //   return 0;
        // })
        ?.map(
          (
            { TotalTimePassedByTrackingType, percentage, trackingTypeName },
            index
          ) => ({
            label: trackingTypeName,
            value: TotalTimePassedByTrackingType,
            percentage: percentage?.toFixed(2),
            color: arrayColors[index],
          })
        )
    );
  }, [productivityTimes]);

  const renderRealForecast = useMemo(() => {
    let values = null;
    if (productivityRealForecast) {
      let labels = [];
      let forecastValues = [];
      let realValues = [];
      productivityRealForecast.forEach(({ date, forecastValue, realValue }) => {
        labels = [...labels, date];
        forecastValues = [...forecastValues, forecastValue];
        realValues = [...realValues, realValue];
      });
      values = {
        labels,
        forecastValues,
        realValues,
      };
    }
    return values;
  }, [productivityRealForecast]);

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

  const renderProdData = useMemo(() => {
    if (productivityHomeProdvalues) {
      return productivityHomeProdvalues?.prodData?.map(
        ({
          domainName,
          realProductivity,
          productivityRatioPcent,
          totalQuantity,
        }) => {
          return {
            id: 5,
            equipe: domainName,
            average: realProductivity,
            averageUnit: "lignes/h",
            performance: "-2%",
            amount: totalQuantity,
            amountUnit: "colis",
            percentage: productivityRatioPcent,
          };
        }
      );
    }
    return [];
  }, [productivityHomeProdvalues]);

  return (
    <div className="bg-blue-900 h-screen overflow-auto p-4">
      <div className="flex justify-content-between align-items-center text-white mb-4">
        <div>
          <div className="text-left text-4xl font-bold">Bonjour, Jean</div>
          <div className="text-base">
            Voici les chiffres des 7 derniers jours
          </div>
        </div>
      </div>
      <div>
        <div className="text-left text-xl text-white font-semibold">Productivité</div>
        <div className="grid my-2">
          <div className="col-2">
            <ObjectiveCard
              onClick={() => navigate("/objective")}
              value={productivityHomeProdvalues?.goal}
            />
          </div>
          <div className="col-2">
            <TempsCard
              onClick={() => navigate("/temps")}
              values={renderProductivityTimes}
            />
          </div>
          <div className="col-8">
            <PerformanceSlider
              onClickCard={(activityId) =>
                navigate(`/productivity/${activityId}`)
              }
              products={renderProdData}
            />
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="col-6">
          <div className="text-left text-xl text-white font-semibold mb-2">Charge</div>
        </div>
        <div className="col-6">
          <div className="text-left text-xl text-white font-semibold mb-2">Resources</div>
        </div>
      </div>
      <div className="grid">
        <div className="col-6">
          <ChargeCard values={renderRealForecast} />
        </div>
        <div className="col-6">
          <ResourcesCard values={renderHomeResources} />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
