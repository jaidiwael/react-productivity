import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../theme.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <div className="App surface-b  p-2 h-screen overflow-auto	">
          {/** content here */}
        </div>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;
