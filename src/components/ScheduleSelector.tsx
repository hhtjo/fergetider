import { useContext } from "react";
import { StopPlace } from "../api/stopPlace";
import { DestinationSelector } from "./DestinationSelector";
import { Loader } from "./Loader";
import { SearchField } from "./searchField";
import { ScheduleContext } from "./FerrySchedule";

export const ScheduleSelector = ({
  onStopSelect,
  onDestinationSelect,
  destinations,
  loading,
}: {
  onStopSelect: (id?: string) => void;
  onDestinationSelect: (id?: string) => void;
  loading: boolean;
  destinations?: Record<string, StopPlace>;
}) => {
  const schedule = useContext(ScheduleContext);

  const fromSelector = (
    <SearchField
      label="Fra:"
      value={schedule?.departureStop?.name}
      onSelect={onStopSelect}
    />
  );

  const toSelector = schedule?.destinationStop?.name ? (
    <SearchField
      label="Til:"
      value={schedule?.destinationStop?.name}
      disabled
      onSelect={onDestinationSelect}
    />
  ) : loading ? (
    <Loader />
  ) : schedule?.departureStop ? (
    <DestinationSelector
      onSelect={onDestinationSelect}
      destinations={destinations ?? {}}
    />
  ) : (
    <></>
  );

  return (
    <div className="space-y-4 px-4 py-8">
      {fromSelector}
      {toSelector}
    </div>
  );
};
