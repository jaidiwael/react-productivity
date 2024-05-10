import { Routes, Route } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { useIsFetching } from "@tanstack/react-query";

import HomePage from "./pages/home-page";
import Objective from "./pages/objective";
import Productivity from "./pages/productivity";
import Temps from "./pages/temps";
import Charge from "./pages/charge";

const Pages = () => {
  const isFetching = useIsFetching();
  console.log("isFetching", isFetching);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/objective" element={<Objective />} />
        <Route path="/temps" element={<Temps />} />
        <Route path="/productivity/:activityId" element={<Productivity />} />
        <Route path="/charge" element={<Charge />} />
      </Routes>
      {isFetching > 0 && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-5 flex justify-content-center p-8">
          <div style={{ marginTop: "30vh" }}>
            <ProgressSpinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pages;
