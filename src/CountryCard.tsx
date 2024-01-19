import { Country } from "./api";
import "./CountryCard.css";

type Props = { country: Country };

export default function CountryCard({ country }: Props) {
  return (
    <a className="CountryCard" href={`/country/${country.alpha3Code}`}>
      <picture className="flag">
        <img src={country.flags.svg} alt={`flag of ${country.name}`} />
      </picture>
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
