import { useNavigate } from "react-router-dom";

import ChargeCard from "../components/charge-card";
import ObjectiveCard from "../components/objective-card";
import PerformanceSlider from "../components/performance-slider";
import ResourcesCard from "../components/resources-card";
import TempsCard from "../components/temps-card";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-900 h-screen overflow-auto p-4">
      <div className="flex justify-content-between align-items-center text-white mb-4">
        <div>
          <div className="text-xl font-bold">Bonjour, Jean</div>
          <div className="text-sm">Voici les chiffres des 7 derniers jours</div>
        </div>
      </div>
      <div>
        <div className="text-base text-white">Productivité</div>
        <div className="grid my-2">
          <div className="col-2">
            <ObjectiveCard onClick={() => navigate("/objective")} />
          </div>
          <div className="col-2">
            <TempsCard onClick={() => navigate("/temps")} />
          </div>
          <div className="col-8">
            <PerformanceSlider onClickCard={() => navigate("/productivity")} />
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="col-6">
          <div className="text-base text-white mb-2">Charge</div>
        </div>
        <div className="col-6">
          <div className="text-base text-white mb-2">Resources</div>
        </div>
      </div>
      <div className="grid">
        <div className="col-6">
          <ChargeCard />
        </div>
        <div className="col-6">
          <ResourcesCard />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
