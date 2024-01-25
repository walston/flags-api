import { Link } from "react-router-dom";
import { Country } from "./api";
import "./CountryCard.css";

type Props = { country: Country };

const formatter = Intl.NumberFormat("en-US");

export default function CountryCard({ country }: Props) {
  return (
    <Link className="CountryCard" to={`/${country.alpha3Code}`}>
      <picture className="flag">
        <img src={country.flags.svg} alt={`flag of ${country.name}`} />
      </picture>
      <div className="details">
        <h3>{country.name}</h3>
        <ul>
          <li>
            <strong>population:</strong> {formatter.format(country.population)}
          </li>
          <li>
            <strong>region:</strong> {country.region}
          </li>
          <li>
            <strong>capital:</strong> {country.capital}
          </li>
        </ul>
      </div>
    </Link>
  );
}
