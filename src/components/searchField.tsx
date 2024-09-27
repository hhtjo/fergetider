import { useState } from "react";
import { GeocoderFeature, getAutocomplete } from "../api/geolocate";
import { useQuery } from "@tanstack/react-query";
import useDebounced from "../hooks/useDebounced";
import { InputField } from "./InputField";
import { GeoDropDown } from "./GeoDropDown";

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
    <div>
      <InputField
        label={label}
        onInput={onInput}
        value={text}
        isClearable={!!text.length}
        disabled={disabled}
        onClear={onClear}
        hasDropdownOpen={isDirty && !!query.data?.features.length}
      />
      {isDirty && (
        <GeoDropDown values={query.data?.features ?? []} onClick={onClick} />
      )}
    </div>
  );
};
