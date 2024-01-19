import { useState, useEffect, useRef } from "react";

type Params = { region?: string; name?: string };
export function useGetCountryList(params?: Params): Country[] {
  const [response, setResponse] = useState<Country[]>([]);
  const abort = useRef(new AbortController());

  useEffect(() => {
    const url = new URL("/api/countries", window.location.origin);
    if (params?.name) url.searchParams.set("name", params.name);
    if (params?.region) url.searchParams.set("region", params.region);

    fetch(url, { signal: abort.current.signal })
      .then(async (res) => {
        const countries = (await res.json()) as Country[];
        setResponse(countries);
      })
      .catch(console.error);

    return () => {
      abort.current.abort();
      abort.current = new AbortController();
    };
  }, [abort, params]);
  return response;
}

export function useGetCountryByName(name: string): Country[] {
  const [response, setResponse] = useState<Country[]>([]);

  useEffect(() => {
    fetch(`/api/countries?name=${name}`).then(async (res) => {
      const countries = (await res.json()) as Country[];
      setResponse(countries);
    });
  }, [name]);

  return response;
}

type Flag = { svg: string; png: string };
type RegionalBlock = { acronym: string; name: string };
type Currency = { code: string; name: string; symbol: string };
type Language = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};

type TranslationLanguageCode =
  | "br"
  | "pt"
  | "nl"
  | "hr"
  | "fa"
  | "de"
  | "es"
  | "fr"
  | "ja"
  | "it"
  | "hu";

export type Country = {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: [number, number];
  demonym: string;
  area: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  flag: string;
  flags: Flag;
  currencies: Currency[];
  languages: Language[];
  translations: Record<TranslationLanguageCode, string>;
  regionalBlocs: RegionalBlock[];
  cioc: string;
  independent: boolean;
};
