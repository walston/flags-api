import { useState, useEffect, useRef } from "react";

// type of params possibly being passed in.
export type CountryFilters = { region?: string; name?: string };

export function useGetCountryList(filters?: CountryFilters): Country[] {
  // we store our response at the top level function scope so it can be returned by our hook
  // regardless of api request status. we'll need to update it tho, so we store it in state.
  const [response, setResponse] = useState<Country[]>([]);
  // an abort controller to let us cancel current calls in case it the server has not yet completed but a filter has already updated
  // (consider the User typing quickly into the search bar)
  const abort = useRef(new AbortController());

  // our external system we need to connect to our react tree
  // here we'll make an api call, but importantly (and different than previously explained)
  // we're going to need to handle cancellation & cleanup. see the dependency array passed
  // as our update
  useEffect(() => {
    // we're creating a URL object so that we can use the URL.searchParams methods
    // they're cleaner than manually doing it and handling escape characters
    const url = new URL("/api/countries", window.location.origin);

    // only add searchParams to the URL if they're included in params
    if (filters?.name) url.searchParams.set("name", filters.name);
    if (filters?.region) url.searchParams.set("region", filters.region);

    // pass our URL object, and also the abort signal
    // the AbortController has 2 fields:
    // - signal, which we pass in to here,
    // - abort(), which we will call in cleanup
    fetch(url, { signal: abort.current.signal })
      // here we handle success
      .then(async (res) => {
        const countries = (await res.json()) as Country[];
        setResponse(countries);
      })
      // here we handle errors,
      // importantly `abort()` will be treated as an error
      // so it's critical that we do some checking here...
      // @TODO
      .catch(console.error);

    // useEffect callbacks should return THEIR OWN callbacks that cleanup
    // anything that would depend on the dependencies
    // our dependencies are our filters, and we know that if they change
    // we'll need to make a new request, and therefore cancel any unfinished requests
    // hence, we abort().
    //
    // calling abort() "uses up" the controller, so once called, we should replace it with a fresh one
    return () => {
      abort.current.abort();
      abort.current = new AbortController();
    };
  }, [filters?.name, filters?.region]);
  return response;
}

// here we have a much more straightforward api handler
// the `code` argument won't be tied to an input a user can type into,
// we expect it to be part of the URL, therefore it's stable and we have to do
// a lot less to handle user interactions.
export function useGetCountryByCode(code: string): Country | undefined {
  const [response, setResponse] = useState<Country>();

  useEffect(() => {
    fetch(`/api/countries/${code}`).then(async (res) => {
      const country = (await res.json()) as Country;
      setResponse(country);
    });
  }, [code]);

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

// I did some type abstraction just so
// I could fit the whole Country type on my screen.
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
