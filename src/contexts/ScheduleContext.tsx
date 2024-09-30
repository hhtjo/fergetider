/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useEffect, useState } from "react";
import { EstimatedCall, StopPlace } from "../api/stopPlace";

interface ScheduleContextType {
  departureStop?: StopPlace;
  destinationStop?: StopPlace;
  estimatedCalls?: EstimatedCall[];
  setDepartureStop: (departureStop?: StopPlace) => void;
  setDestinationStop: (destinationStop?: StopPlace) => void;
  setEstimatedCalls: (estimatedCalls?: EstimatedCall[]) => void;
}

export const ScheduleContext = createContext<ScheduleContextType>({
  setDepartureStop: (_?: StopPlace) => {},
  setDestinationStop: (_?: StopPlace) => {},
  setEstimatedCalls: (_?: EstimatedCall[]) => {},
});

function getInitialState(itemId: string): () => StopPlace | undefined {
  return () => {
    const state = sessionStorage.getItem(itemId);
    return state ? JSON.parse(state) : undefined;
  };
}
function setOrRemoveSessionState(itemId: string, value: unknown | undefined) {
  if (value) {
    sessionStorage.setItem(itemId, JSON.stringify(value));
  } else {
    sessionStorage.removeItem(itemId);
  }
}

export const ScheduleContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [destinationStop, setDestinationStop] = useState<StopPlace | undefined>(
    getInitialState("destinationStop"),
  );
  const [departureStop, setDepartureStop] = useState<StopPlace | undefined>(
    getInitialState("departureStop"),
  );
  const [estimatedCalls, setEstimatedCalls] = useState<
    EstimatedCall[] | undefined
  >();

  useEffect(() => {
    setOrRemoveSessionState("destinationStop", destinationStop);
  }, [destinationStop]);
  useEffect(() => {
    setOrRemoveSessionState("departureStop", departureStop);
  }, [departureStop]);

  return (
    <ScheduleContext.Provider
      value={{
        departureStop,
        destinationStop,
        estimatedCalls,
        setDepartureStop,
        setDestinationStop,
        setEstimatedCalls,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
