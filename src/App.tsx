import { useState } from "react";
import { useGetCountryList } from "./api";

import CountryCard from "./CountryCard";
import { ColorScheme, getUserColorSchemePreference } from "./util";

import "./App.css";

const REGIONS = [
  "Americas",
  "Europe",
  "Africa",
  "Asia",
  "Oceania",
  "Polar",
  "Antarctic Ocean",
  "Antarctic",
];

function App() {
  const [mode, setMode] = useState<ColorScheme>(getUserColorSchemePreference());
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const countries = useGetCountryList({ name, region });

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
          {REGIONS.map((region) => (
            <option value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div role="grid">
        {countries.map((country) => {
          return <CountryCard country={country} key={country.alpha3Code} />;
        })}
      </div>
    </div>
  );
}

export default App;
