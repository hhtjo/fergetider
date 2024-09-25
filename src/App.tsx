import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FerrySchedule } from "./components/FerrySchedule";

const rootqueryClient = new QueryClient();

function App() {
  return (
    <div className="bg-sky-700 p-5 min-h-screen">
      <QueryClientProvider client={rootqueryClient}>
        <div className="max-w-lg mx-auto bg-blue-100 rounded">
          <h1 className="p-4 text-3xl font-semibold text-center">Fergetider</h1>
          <FerrySchedule />
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
