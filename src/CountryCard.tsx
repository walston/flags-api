import { Country } from "./api";

type Props = { country: Country };

export default function CountryCard({ country }: Props) {
  return (
    <a className="CountryCard" href="🚨 NOTE: NEED URL">
      <img src={country.flags.svg} alt={`${country.name} flag`} />
      <div className="details">
        <h3>{country.name}</h3>
        <ul>
          <li>
            <strong>population:</strong> {country.population}
          </li>
          <li>
            <strong>region:</strong> {country.region}
          </li>
          <li>
            <strong>capital:</strong> {country.capital}
          </li>
        </ul>
      </div>
    </a>
  );
}
