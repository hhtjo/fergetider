import { useQuery } from "@tanstack/react-query";
import { getAllDepartures } from "../api/stopPlace";
import { DateTime } from "luxon";

export const Schedule = ({ id }: { id?: string }) => {
  const query = useQuery({
    queryKey: ["schedule", id],
    queryFn: () => {
      return getAllDepartures(id!);
    },
    enabled: !!id,
  });

  function timeUntil(departure: string) {
    return DateTime.fromISO(departure)
      .toRelative({ style: "narrow" })
      ?.replace("+", "");
  }
  return (
    <div>
      <p className="p-4 text-3xl font-medium">
        {query?.data?.stopPlace.name ?? "Rutetider"}
      </p>
      <table className="table-fixed w-full">
        <thead>
          <tr className="font-medium order-b-2 uppercase">
            <td align="left" className="py-2 px-4">
              Avgang:
            </td>
            <td align="center" className="py-2 px-4">
              Mot:
            </td>
            <td align="right" className="py-2 px-4">
              Om:
            </td>
          </tr>
        </thead>
      </table>
      <div className="overflow-y-scroll max-h-96">
        <table className="table-fixed w-full">
          <tbody>
            {query?.data?.stopPlace.estimatedCalls.map((ec, i) => (
              <tr className="bg-white border-b" key={i}>
                <td className="text-3xl font-semibold px-4 py-2">
                  {DateTime.fromISO(ec.aimedDepartureTime).toFormat("HH:mm")}
                </td>
                <td align="center" className="px-4 py-2">
                  {ec.destinationDisplay.frontText}
                </td>
                <td align="right" className="text-xl font-medium px-4 py-1">
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
