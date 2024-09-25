import { useMemo, useState } from "react";
import { Schedule } from "./schedule";
import { ScheduleSelector } from "./ScheduleSelector";
import { getAllDepartures, StopPlace } from "../api/stopPlace";
import { useQuery } from "@tanstack/react-query";

export const FerrySchedule = () => {
  const stopPlaces: Record<string, StopPlace> = {};

  const [currentPage, setCurrentPage] = useState("schedule_select");
  const [selectedStop, setSelectedStop] = useState<string | undefined>();
  const [selectedDestination, setSelectedDestination] = useState<
    string | undefined
  >();

  const query = useQuery({
    queryKey: ["schedule", selectedStop],
    queryFn: () => {
      return getAllDepartures(selectedStop!);
    },
    enabled: !!selectedStop,
  });

  function onDestinationSelect(destination?: string) {
    if(destination == "") {
      destination = undefined
    }
    setSelectedDestination(destination);
    setCurrentPage(destination && selectedStop ? "show_schedule" : "schedule_select");
  }
  function onStopSelect(stop?: string) {
    onDestinationSelect(undefined);
    setSelectedStop(stop);
  }

  if (selectedStop && query.data) {
    query.data.stopPlace.estimatedCalls.forEach((e) => {
      const destination =
        e.serviceJourney.quays[e.serviceJourney.quays.length - 1];
      stopPlaces[destination.stopPlace.id] = destination.stopPlace;
    });
  }

  const stopPlace = query.data?.stopPlace;
  const destinationStop = stopPlaces?.[selectedDestination ?? ""];
  const showSchedule =
    currentPage == "show_schedule" && !!stopPlace && !!destinationStop;

  const filteredTimes = useMemo(() => {
    return query.data?.stopPlace.estimatedCalls.filter((ec) => {
      return (
        ec.serviceJourney.quays[ec.serviceJourney.quays.length - 1].stopPlace
          .id === selectedDestination
      );
    });
  }, [selectedDestination, query.data]);

  return (
    <div>
      {(currentPage === "schedule_select" || showSchedule) && (
        <ScheduleSelector
          selectedStop={query.data?.stopPlace.name}
          selectedDestination={
            stopPlaces?.[selectedDestination ?? ""]?.name ?? ""
          }
          onStopSelect={onStopSelect}
          destinations={stopPlaces}
          onDestinationSelect={onDestinationSelect}
        />
      )}
      {showSchedule && <Schedule schedule={filteredTimes ?? []} />}
    </div>
  );
};
