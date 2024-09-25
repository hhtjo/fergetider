import { StopPlace } from "../api/stopPlace";

export const DestinationSelector = ({
  destinations,
  onSelect,
}: {
  destinations: Record<string, StopPlace>;
  onSelect: (id: string) => void;
}) => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        {Object.values(destinations).map((d) => (
          <button
            className="bg-white border p-4 rounded w-full text-xl font-semibold hover:bg-gray-100"
            onClick={() => onSelect(d.id)}
          >
            {d.name}
          </button>
        ))}
      </div>
    </div>
  );
};
