export const InputField = ({
  label,
  value,
  placeholder,
  onInput,
  isClearable = false,
  disabled = false,
  onClear,
  hasDropdownOpen = false,
}: {
  label: string;
  placeholder?: string;
  value?: string;
  onInput?: (value: string) => void;
  isClearable?: boolean;
  disabled?: boolean;
  hasDropdownOpen?: boolean;
  onClear?: () => void;
}) => {
  return (
    <div
      className={`relative flex justify-between rounded-t-md ${hasDropdownOpen ? "" : "rounded-b-md"} border border-slate-300 bg-slate-200 transition-colors focus-within:border-sky-800`}
    >
      <div className="flex items-center">
        <label className="pl-2 text-slate-500">{label}</label>
        <input
          className="w-full border-none bg-transparent p-4 text-xl outline-none placeholder:text-slate-500"
          placeholder={placeholder}
          value={value}
          onInput={(e) => onInput?.(e.currentTarget.value)}
          disabled={disabled}
        />
      </div>
      {!!isClearable && (
        <button
          className="px-1 pr-4 text-gray-500 transition-colors hover:text-gray-900"
          onClick={() => onClear?.()}
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
  );
};
