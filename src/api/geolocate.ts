interface GeocoderAutocomplete {
  features: GeocoderFeature[];
}

export interface GeocoderFeature {
  type: string;
  properties: {
    id: string;
    gid: string;
    layer: string;
    source: string;
    source_id: string;
    name: string;
    street: string;
    accuracy: string;
    country_a: string;
    county: string;
    county_gid: string;
    locality: string;
    locality_gid: string;
    label: string;
    category: string[];
    tariff_zones: string[];
  };
}

export async function getAutocomplete(query: string) {
  if (!query) {
    return null;
  }
  const url = `https://api.entur.io/geocoder/v1/autocomplete?lang=no&categories=harbourPort,ferryStop&size=5&text=${query}`;
  const response = await fetch(url);

  return (await response.json()) as GeocoderAutocomplete;
}
