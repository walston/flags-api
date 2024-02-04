import { useState } from "react";
import { useGetCountryList } from "./api";
import CountryCard from "./CountryCard";
import "./CountryGrid.css";

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

export default function CountryGrid() {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const countries = useGetCountryList({ name, region });
  return (
    <>
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
        {countries.map((country) => (
          <CountryCard country={country} key={country.alpha3Code} />
        ))}
      </div>
    </>
  );
}
