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
              className="w-full rounded-md border border-slate-300 bg-slate-100 p-4 text-left text-xl hover:bg-slate-200 active:border-sky-800"
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
