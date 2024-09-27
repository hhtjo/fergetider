import { GeocoderFeature } from "../api/geolocate";

export const GeoDropDown = ({
  values,
  onClick,
}: {
  values: GeocoderFeature[];
  onClick: (feature: GeocoderFeature) => void;
}) => {
  return (
    <div className="relative">
      <ul className="absolute z-50 w-full max-w-full rounded-b border border-t-0 border-gray-300 bg-slate-100 text-black">
        {values.map((val) => (
          <li
            className="flex w-full cursor-pointer flex-col justify-between border-b border-slate-200 p-3 text-lg hover:bg-slate-200 xs:flex-row xs:items-center"
            onClick={() => onClick(val)}
            key={val.properties.id}
          >
            <p className="flex-grow">{val.properties.name}</p>
            <span className="flex-grow text-sm text-gray-500 xs:text-right">
              {val.properties.locality}, {val.properties.county}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
