import { useContext } from "react";
import { StopPlace } from "../api/stopPlace";
import { DestinationSelector } from "./DestinationSelector";
import { Loader } from "./Loader";
import { SearchField } from "./searchField";
import { ScheduleContext } from "../contexts/ScheduleContext";

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
  const { departureStop, destinationStop}= useContext(ScheduleContext);

  const fromSelector = (
    <SearchField
      label="Fra:"
      value={departureStop?.name}
      onSelect={onStopSelect}
    />
  );

  const toSelector = destinationStop?.name ? (
    <SearchField
      label="Til:"
      value={destinationStop?.name}
      disabled
      onSelect={onDestinationSelect}
    />
  ) : loading ? (
    <Loader />
  ) :departureStop ? (
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
