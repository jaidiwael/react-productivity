import { useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useIsFetching } from "@tanstack/react-query";

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
import productivityIcon from "../../assets/images/productivite.svg";
import chargeIcon from "../../assets/images/charge.svg";
import resourcesIcon from "../../assets/images/resource.svg";
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

  const isFetching = useIsFetching();

  const renderProductivityTimes = useMemo(() => {
    return productivityTimes?.map(
      (
        { TotalTimePassedByTrackingType, percentage, trackingTypeName },
        index
      ) => ({
        label: trackingTypeName,
        value: TotalTimePassedByTrackingType,
        percentage: percentage?.toFixed(2),
        color: arrayColors?.find((c) => c?.label === trackingTypeName)?.color,
      })
    );
  }, [productivityTimes, isFetching]);

  const renderRealForecast = useMemo(() => {
    let values = null;
    if (productivityRealForecast) {
      let labels = [];
      let forecastValues = [];
      let realValues = [];
      let alkiValues = [];
      productivityRealForecast.forEach(
        ({ date, forecastValue, realValue, alkiValue }) => {
          labels = [...labels, date];
          forecastValues = [...forecastValues, forecastValue];
          realValues = [...realValues, realValue];
          alkiValues = [...alkiValues, alkiValue];
        }
      );
      values = {
        labels,
        forecastValues,
        realValues,
        alkiValues,
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
          domainColor,
          unitName,
          domainId,
        }) => {
          return {
            id: domainId,
            equipe: domainName,
            average: realProductivity,
            averageUnit: "lignes/h",
            performance: "-2%",
            amount: totalQuantity,
            amountUnit: unitName,
            percentage: productivityRatioPcent,
            domainColor,
          };
        }
      );
    }
    return [];
  }, [productivityHomeProdvalues]);

  return (
    <div className="bg-blue-900 h-screen overflow-auto px-4 py-2">
      <div className="flex-shrink-1">
        <div className="text-left text-base text-white font-semibold flex align-items-center gap-2">
          <img src={productivityIcon} width="20px" alt="" />
          Productivité (7 derniers jours)
        </div>
        <div className="grid my-1">
          <div className="col-2">
            <ObjectiveCard
              onClick={() => navigate("/objective")}
              value={isFetching === 0 && productivityHomeProdvalues?.goal}
              title={"Objectif Global"}
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
      <div className="flex-shrink-1">
        <div className="grid">
          <div className="col-6">
            <div className="text-left text-base text-white font-semibold mb-1 flex align-items-center gap-2">
              <img src={chargeIcon} width="20px" alt="" />
              Charge (Outbound) (7 derniers jours)
            </div>
          </div>
          <div className="col-6">
            <div className="text-left text-base text-white font-semibold mb-1 flex align-items-center gap-2">
              <img src={resourcesIcon} width="20px" alt="" />
              Resources (7 derniers jours)
            </div>
          </div>
        </div>
        <div className="grid">
          <div className="col-6">
            <ChargeCard
              values={renderRealForecast}
              onClick={() => navigate("/charge")}
            />
          </div>
          <div className="col-6">
            <ResourcesCard
              values={renderHomeResources}
              onClick={() => navigate(`/resources/1`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(HomePage);
