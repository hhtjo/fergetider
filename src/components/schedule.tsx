import { EstimatedCall } from "../api/stopPlace";
import { DateTime } from "luxon";

function timeUntil(departure: string) {
  return DateTime.fromISO(departure)
    .toRelative({ style: "narrow" })
    ?.replace("+", "");
}

function diffDays(departure: string): number {
  const datetime = DateTime.fromISO(departure);
  if (!datetime.hasSame(DateTime.now(), "day")) {
    return Math.ceil(datetime.diff(DateTime.now(), "days").days);
  }
  return 0;
}

export const Schedule = ({
  schedule,
  updatedAt,
}: {
  schedule: EstimatedCall[];
  updatedAt?: number;
}) => {
  return (
    <>
      <div className="mt-8 overflow-y-auto">
        <table className="relative w-full table-fixed">
          <thead>
            <tr className="order-b-2 sticky top-0 bg-blue-300 font-medium uppercase">
              <td align="left" className="sticky top-0 px-6 py-2">
                Avgang:
              </td>
              <td align="right" className="px-6 py-2">
                Om:
              </td>
            </tr>
          </thead>
          <tbody>
            {schedule?.map((ec, i) => (
              <ScheduleRow estimatedCall={ec} key={i} />
            ))}
          </tbody>
        </table>
      </div>
      <p className="p-3 text-center text-sm text-slate-400">
        {updatedAt && (
          <>Oppdatert: {DateTime.fromMillis(updatedAt).toFormat("HH:mm")}</>
        )}
      </p>
    </>
  );
};

const ScheduleRow = ({
  estimatedCall: ec,
}: {
  estimatedCall: EstimatedCall;
}) => (
  <tr className="border-b bg-white">
    <td className="flex px-6 py-3 font-mono text-3xl font-medium">
      {DateTime.fromISO(ec.aimedDepartureTime).toFormat("HH:mm")}
      {diffDays(ec.aimedDepartureTime) > 0 && (
        <span className="px-1 text-sm text-gray-400">
          +{diffDays(ec.aimedDepartureTime)}
        </span>
      )}
    </td>
    <td align="right" className="px-6 py-1 text-xl font-medium">
      {timeUntil(ec.aimedDepartureTime)}
    </td>
  </tr>
);
