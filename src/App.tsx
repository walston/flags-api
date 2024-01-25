import { useMemo, useState } from "react";
import { Country, useGetCountryList } from "./api";
import CountryCard from "./CountryCard";
import "./App.css";
import { ColorScheme, getUserColorSchemePreference } from "./util";

function App() {
  const [mode, setMode] = useState<ColorScheme>(getUserColorSchemePreference());
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const countries = useGetCountryList({ name, region });
  const regions = useMemo(() => {
    const set = countries.reduce((set, country) => {
      set.add(country.region);
      return set;
    }, new Set<Country["region"]>());
    return [...set];
  }, [countries]);

  return (
    <div className="App">
      <header>
        <h1>Where in the world?</h1>
        <button
          onClick={() =>
            setMode((mode) => (mode === "dark" ? "light" : "dark"))
          }
        >
          {mode === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <div role="toolbar">
        <input
          type="search"
          aria-label="Search for a country…"
          placeholder="Search for a country…"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">Filter by Region</option>
          {regions.map((region) => (
            <option value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div role="grid">
        {countries?.map((country) => {
          return <CountryCard country={country} />;
        })}
      </div>
    </div>
  );
}

export default App;
