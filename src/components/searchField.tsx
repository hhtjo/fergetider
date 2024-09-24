import { useState } from "react";
import { GeocoderFeature, getAutocomplete } from "../api/geolocate";
import { useQuery } from "@tanstack/react-query";
import useDebounced from "../hooks/useDebounced";

export const SearchField = ({
  onSelect,
}: {
  onSelect?: (id: string) => void;
}) => {
  const [text, setText] = useState("");
  const debouncedText = useDebounced(text, 500);
  const [isDirty, setIsDirty] = useState(false);

  const query = useQuery({
    queryKey: ["test", debouncedText],
    queryFn: () => getAutocomplete(debouncedText),
    enabled: isDirty && debouncedText.length > 2,
  });

  function onClick(el: GeocoderFeature) {
    setIsDirty(false);
    setText(el.properties.name);
    onSelect?.(el.properties.id);
  }

  function onInput(txt: string) {
    setText(txt);
    setIsDirty(true);
  }

  return (
    <div className="p-5">
      <input
        className="border border-gray-400 p-2 bg-white w-full"
        onInput={(e) => onInput(e.currentTarget.value)}
        placeholder="Søk"
        value={text}
      />
      {isDirty && (
        <ul className="border border-t-0 border-gray-400 bg-gray-50">
          {query.data?.features.map((res) => (
            <li
              className="p-2 w-full border-b hover:bg-blue-50 cursor-pointer"
              onClick={() => onClick(res)}
              key={res.properties.id}
            >
              {res.properties.name} [{res.properties.id}]
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
