import { EstimatedCall } from "../api/stopPlace";
import { DateTime } from "luxon";

function timeUntil(departure: string) {
  return DateTime.fromISO(departure)
    .toRelative({ style: "narrow" })
    ?.replace("+", "");
}

export const Schedule = ({ schedule }: { schedule: EstimatedCall[] }) => {
  return (
    <div>
      <table className="table-fixed w-full">
        <thead>
          <tr className="font-medium order-b-2 uppercase">
            <td align="left" className="py-2 px-10">
              Avgang:
            </td>
            <td align="right" className="py-2 px-10">
              Om:
            </td>
          </tr>
        </thead>
      </table>
      <div className="overflow-y-auto max-h-96">
        <table className="table-fixed w-full">
          <tbody>
            {schedule?.map((ec, i) => (
              <tr className="bg-white border-b" key={i}>
                <td className="text-3xl font-medium px-6 py-3 font-mono">
                  {DateTime.fromISO(ec.aimedDepartureTime).toFormat("HH:mm")}
                </td>
                <td align="right" className="text-xl font-medium px-6 py-1">
                  {timeUntil(ec.aimedDepartureTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
