import { Country } from "./api";

type Props = { country: Country };

export default function CountryCard({ country }: Props) {
  return (
    <a className="CountryCard" href="🚨 NOTE: NEED URL">
      <img src={country.flags.svg} alt={`${country.name} flag`} />
      <div className="details">
        <h3>{country.name}</h3>
        <ul>
          <li>population: {country.population}</li>
          <li>region: {country.region}</li>
          <li>capital: {country.capital}</li>
        </ul>
      </div>
    </a>
  );
}
