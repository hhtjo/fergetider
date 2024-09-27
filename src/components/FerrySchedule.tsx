import { createContext, useEffect, useMemo, useState } from "react";
import { Schedule } from "./schedule";
import { ScheduleSelector } from "./ScheduleSelector";
import { EstimatedCall, getAllDepartures, StopPlace } from "../api/stopPlace";
import { useQuery } from "@tanstack/react-query";

interface ScheduleContextType {
  departureStop?: StopPlace;
  destinationStop?: StopPlace;
  estimatedCalls?: EstimatedCall[];
}

export const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const FerrySchedule = () => {
  const [currentPage, setCurrentPage] = useState("schedule_select");
  const [selectedStop, setSelectedStop] = useState<string | undefined>();
  const [scheduleContext, setScheduleContext] =
    useState<ScheduleContextType | null>(null);
  const stopPlaces: Record<string, StopPlace> = {};

  function onStopSelect(stop?: string) {
    onDestinationSelect(undefined);
    setSelectedStop(stop);
  }

  const query = useQuery({
    queryKey: ["schedule", selectedStop],
    queryFn: () => {
      return getAllDepartures(selectedStop!);
    },
    enabled: !!selectedStop,
  });

  if (query.data) {
    query.data.stopPlace.estimatedCalls.forEach((e) => {
      const destination =
        e.serviceJourney.quays[e.serviceJourney.quays.length - 1];
      stopPlaces[destination.stopPlace.id] = destination.stopPlace;
    });
  }

  function onDestinationSelect(destination?: string) {
    if (destination == "") {
      destination = undefined;
    }
    setScheduleContext((v) => ({
      ...v,
      destinationStop: stopPlaces[destination ?? ""],
    }));
    setCurrentPage(
      destination && selectedStop ? "show_schedule" : "schedule_select",
    );
  }

  const stopPlace = query.data?.stopPlace;

  useEffect(() => {
    setScheduleContext((v) => ({
      ...v,
      departureStop: stopPlace,
    }));
  }, [stopPlace]);

  const showSchedule =
    currentPage == "show_schedule" &&
    !!stopPlace &&
    !!scheduleContext?.destinationStop;

  const filteredTimes = useMemo(() => {
    return query.data?.stopPlace.estimatedCalls.filter((ec) => {
      return (
        ec.serviceJourney.quays[ec.serviceJourney.quays.length - 1].stopPlace
          .id === scheduleContext?.destinationStop?.id
      );
    });
  }, [scheduleContext?.destinationStop?.id, query.data]);

  return (
    <div className="flex h-full flex-col">
      <h1 className="px-4 pt-8 pb-0 text-center text-3xl font-semibold">Fergetider</h1>
      <ScheduleContext.Provider value={scheduleContext}>
        {(currentPage === "schedule_select" || showSchedule) && (
          <ScheduleSelector
            onStopSelect={onStopSelect}
            destinations={stopPlaces}
            onDestinationSelect={onDestinationSelect}
            loading={query.isLoading}
          />
        )}
        {showSchedule && (
          <Schedule
            schedule={filteredTimes ?? []}
            updatedAt={query.dataUpdatedAt}
          />
        )}
      </ScheduleContext.Provider>
    </div>
  );
};
