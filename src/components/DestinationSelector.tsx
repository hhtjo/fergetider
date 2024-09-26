import { StopPlace } from "../api/stopPlace";

export const DestinationSelector = ({
  destinations,
  onSelect,
}: {
  destinations: Record<string, StopPlace>;
  onSelect: (id: string) => void;
}) => {
  const hasDestinations = Object.values(destinations).length > 0;
  return (
    <>
      <p className="text-lg">
        {hasDestinations ? "Velg rute:" : "Fant ingen ruter."}
      </p>
      <ul className="space-y-3 overflow-y-auto">
        {Object.values(destinations).map((d) => (
          <li key={d.id}>
            <button
              className="w-full rounded border-2 border-slate-300 bg-white p-4 text-left text-xl font-semibold hover:bg-gray-100"
              onClick={() => onSelect(d.id)}
            >
              {d.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
