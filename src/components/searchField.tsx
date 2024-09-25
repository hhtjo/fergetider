import { useState } from "react";
import { GeocoderFeature, getAutocomplete } from "../api/geolocate";
import { useQuery } from "@tanstack/react-query";
import useDebounced from "../hooks/useDebounced";

export const SearchField = ({
  onSelect,
  label,
  value,
  disabled = false,
}: {
  onSelect?: (id?: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}) => {
  const [text, setText] = useState(value ?? "");
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
    setIsDirty(!!txt.length);
  }

  function onClear() {
    onInput("");
    onSelect?.(undefined);
  }

  return (
    <p className="relative w-full justify-between bg-slate-100 text-slate-500 rounded border focus-within:border-blue-500">
      <label className="p-2">{label}</label>
      <div className="text-2xl font-semibold flex justify-between text-gray-800 relative">
        <input
          className="p-2 w-full bg-transparent outline-none border-none"
          onInput={(e) => onInput(e.currentTarget.value)}
          placeholder="Søk"
          value={text}
          disabled={disabled}
        />
        {!!text.length && (
          <button
            className="text-lg text-gray-500 hover:text-gray-800 font-medium px-1 pr-4"
            onClick={onClear}
          >
            X
          </button>
        )}
      </div>
      {isDirty && (
        <ul className="mt-[1px] absolute w-full max-w-full border border-t-0 border-gray-400 bg-gray-50 top-full">
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
    </p>
  );
};
