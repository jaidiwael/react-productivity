import { PrimeReactProvider, addLocale } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import moment from "moment";

import HomePage from "./pages/home-page";
import Objective from "./pages/objective";
import Productivity from "./pages/productivity";
import Temps from "./pages/temps";
import Charge from "./pages/charge";

import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../theme.css";

import "moment/locale/fr";

const queryClient = new QueryClient();
addLocale("fr", {
  firstDayOfWeek: 1,
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Di", "Lu", "Ma", "Me", "Jeu", "Ven", "Sam"],
  dayNamesMin: ["D", "L", "M", "Me", "J", "V", "S"],
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "May",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mar",
    "Jui",
    "Juil",
    "Aou",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ],
  today: "Ajourd'hui",
  clear: "Vider",
  //...
});

function App() {
  moment.locale("fr");
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
            <Route path="/charge" element={<Charge />} />
          </Routes>
        </div>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;
