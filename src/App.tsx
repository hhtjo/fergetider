import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchField } from "./components/searchField";
import { Schedule } from "./components/schedule";
import { useState } from "react";

const rootqueryClient = new QueryClient();

function App() {
  const [stopId, setStopId] = useState<string | undefined>();
  return (
    <div className="bg-sky-700 p-5 min-h-screen">
      <QueryClientProvider client={rootqueryClient}>
        <div className="max-w-lg mx-auto bg-blue-100 rounded">
          <SearchField onSelect={(id) => setStopId(id)} />
          <Schedule id={stopId} />
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
