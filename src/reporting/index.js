import { PrimeReactProvider, addLocale } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import moment from "moment";

import Pages from "./pages";

import "primereact/resources/primereact.min.css";
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
        <Pages />
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;
