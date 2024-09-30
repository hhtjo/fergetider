import { useContext, useEffect, useMemo, useState } from "react";
import { Schedule } from "./schedule";
import { ScheduleSelector } from "./ScheduleSelector";
import { getAllDepartures, StopPlace } from "../api/stopPlace";
import { useQuery } from "@tanstack/react-query";
import { ScheduleContext } from "../contexts/ScheduleContext";

export const FerrySchedule = () => {
  const {
    departureStop,
    destinationStop,
    setDepartureStop,
    setDestinationStop,
  } = useContext(ScheduleContext);
  const [selectedStop, setSelectedStop] = useState<string | undefined>(
    departureStop?.id,
  );
  const stopPlaces: Record<string, StopPlace> = {};

  function onStopSelect(stop?: string) {
    onDestinationSelect(undefined);
    setSelectedStop(stop);
  }

  useEffect(() => {
    setSelectedStop(departureStop?.id);
  }, [departureStop]);

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
    setDestinationStop(stopPlaces[destination ?? ""]);
  }

  const stopPlace = query.data?.stopPlace;

  useEffect(() => {
    if (stopPlace) {
      setDepartureStop({ id: stopPlace.id, name: stopPlace.name });
    }
  }, [stopPlace, setDepartureStop]);

  const showSchedule = !!stopPlace && !!destinationStop;

  const filteredTimes = useMemo(() => {
    return query.data?.stopPlace.estimatedCalls.filter((ec) => {
      return (
        ec.serviceJourney.quays[ec.serviceJourney.quays.length - 1].stopPlace
          .id === destinationStop?.id
      );
    });
  }, [destinationStop?.id, query]);

  return (
    <div className="flex h-full flex-col">
      <h1 className="px-4 pb-0 pt-8 text-center text-3xl font-semibold">
        Fergetider
      </h1>
      <ScheduleSelector
        onStopSelect={onStopSelect}
        destinations={stopPlaces}
        onDestinationSelect={onDestinationSelect}
        loading={query.isLoading}
      />
      {showSchedule && (
        <Schedule
          schedule={filteredTimes ?? []}
          updatedAt={query.dataUpdatedAt}
        />
      )}
    </div>
  );
};
