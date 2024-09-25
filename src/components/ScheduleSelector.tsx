import { StopPlace } from "../api/stopPlace";
import { DestinationSelector } from "./DestinationSelector";
import { SearchField } from "./searchField";

export const ScheduleSelector = ({
  selectedStop,
  selectedDestination,
  onStopSelect,
  onDestinationSelect,
  destinations,
}: {
  selectedStop?: string;
  selectedDestination?: string;
  onStopSelect: (id?: string) => void;
  onDestinationSelect: (id?: string) => void;
  destinations?: Record<string, StopPlace>;
}) => {
  const fromSelector = <SearchField label="Fra:" onSelect={onStopSelect} />;

  const toSelector = selectedDestination ? (
    <SearchField
      label="Til:"
      value={selectedDestination}
      disabled
      onSelect={onDestinationSelect}
    />
  ) : (
    <DestinationSelector
      onSelect={onDestinationSelect}
      destinations={destinations ?? {}}
    />
  );

  return (
    <div className="p-4 space-y-4">
      {fromSelector}
      {toSelector}
    </div>
  );
};
