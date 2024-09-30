import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FerrySchedule } from "./components/FerrySchedule";
import { ScheduleContextProvider } from "./contexts/ScheduleContext";

const rootqueryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={rootqueryClient}>
      <ScheduleContextProvider>
        <div className="min:h-screen h-screen bg-sky-600 md:p-16">
          <div className="mx-auto h-full max-w-md overflow-y-auto bg-gray-50 sm:rounded-xl sm:shadow-lg">
            <FerrySchedule />
          </div>
        </div>
      </ScheduleContextProvider>
    </QueryClientProvider>
  );
}

export default App;
