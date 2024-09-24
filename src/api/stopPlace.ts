import request, { gql } from "graphql-request";

interface StopPlaceQuery {
  stopPlace: {
    longitude: number;
    latitude: number;
    name: string;
    transportMode: Array<string>;
    estimatedCalls: Array<{
      aimedArrivalTime: string;
      aimedDepartureTime: string;
      destinationDisplay: {
        frontText: string;
        via: Array<string>;
      };
      serviceJourney: {
        quays: Array<{
          stopPlace: {
            name: string;
            id: string;
          };
        }>;
      };
    }>;
  };
}

const stopPlaceQuery = gql`
  query stopPlaceQuery($stopPlace: String!) {
    stopPlace(id: $stopPlace) {
      longitude
      latitude
      name
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
    }
  );
}
