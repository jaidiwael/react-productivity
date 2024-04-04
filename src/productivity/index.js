import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../theme.css";
import HomePage from "./pages/home-page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <div className="App">
          <HomePage />
        </div>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;
