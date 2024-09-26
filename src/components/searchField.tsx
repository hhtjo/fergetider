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
    <p className="relative w-full justify-between rounded border border-2 border-slate-400 bg-slate-100 pt-2 text-slate-500 focus-within:border-blue-500">
      <label className="pl-2">{label}</label>
      <div className="relative flex justify-between text-2xl font-semibold text-gray-800">
        <input
          className="w-full border-none bg-transparent p-2 pt-0 outline-none"
          onInput={(e) => onInput(e.currentTarget.value)}
          placeholder="Søk"
          value={text}
          disabled={disabled}
        />
        {!!text.length && (
          <button
            className="px-1 pr-4 text-lg font-medium text-gray-500 hover:text-gray-900"
            onClick={onClear}
          >
            <svg
              className="stroke-gray-500 hover:stroke-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              strokeWidth="10"
              viewBox="0 0 256 256"
            >
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </button>
        )}
      </div>
      {isDirty && (
        <ul className="absolute top-full z-50 mt-[2px] w-full max-w-full rounded-b border border-t-0 border-gray-300 bg-gray-100 text-black">
          {query.data?.features.map((res) => (
            <li
              className="flex w-full cursor-pointer flex-col justify-between border-b border-gray-300 p-3 text-lg hover:bg-blue-50 xs:flex-row xs:items-center"
              onClick={() => onClick(res)}
              key={res.properties.id}
            >
              <p className="flex-grow">{res.properties.name}</p>
              <span className="flex-grow text-sm text-gray-500 xs:text-right">
                {res.properties.locality}, {res.properties.county}
              </span>
            </li>
          ))}
        </ul>
      )}
    </p>
  );
};
