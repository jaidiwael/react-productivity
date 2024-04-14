import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page";
import Objective from "./pages/objective";
import Productivity from "./pages/productivity";
import Temps from "./pages/temps";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../theme.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/objective" element={<Objective />} />
            <Route path="/temps" element={<Temps />} />
            <Route
              path="/productivity/:activityId"
              element={<Productivity />}
            />
          </Routes>
        </div>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;
