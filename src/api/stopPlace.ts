import request, { gql } from "graphql-request";

export interface StopPlaceQuery {
  stopPlace: {
    longitude: number;
    latitude: number;
    id: string;
    name: string;
    transportMode: Array<string>;
    estimatedCalls: EstimatedCall[];
  };
}

export interface StopPlace {
  id: string;
  name: string;
}

export interface EstimatedCall {
  aimedArrivalTime: string;
  aimedDepartureTime: string;
  destinationDisplay: {
    frontText: string;
    via: Array<string>;
  };
  serviceJourney: {
    quays: Array<{
      stopPlace: StopPlace;
    }>;
  };
}

const stopPlaceQuery = gql`
  query stopPlaceQuery($stopPlace: String!) {
    stopPlace(id: $stopPlace) {
      longitude
      latitude
      name
      id
      transportMode
      estimatedCalls(
        arrivalDeparture: departures
        whiteListedModes: water
        numberOfDeparturesPerLineAndDestinationDisplay: 20
        numberOfDepartures: 1000
      ) {
        aimedArrivalTime
        aimedDepartureTime
        actualDepartureTime
        actualArrivalTime
        destinationDisplay {
          frontText
          via
        }
        serviceJourney {
          quays {
            stopPlace {
              name
              id
            }
          }
        }
      }
    }
  }
`;

export async function getAllDepartures(stopId: string) {
  return await request<StopPlaceQuery>(
    "https://api.entur.io/journey-planner/v3/graphql",
    stopPlaceQuery,
    {
      stopPlace: stopId,
    },
  );
}
