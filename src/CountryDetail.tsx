import { useParams } from "react-router";
import { useGetCountryByCode } from "./api";
import { Link } from "react-router-dom";
import "./CountryDetail.css";

export default function CountryDetail() {
  const params = useParams<{ alpha3Code: string }>();
  const country = useGetCountryByCode(params.alpha3Code || "");

  if (!country) return <p>{JSON.stringify(params)}</p>;

  return (
    <div className="CountryDetails">
      <Link className="BackButton" to="/">
        {" "}
        ← Back{" "}
      </Link>
      <main>
        <picture className="flag">
          <img src={country.flags.svg} alt={`flag of ${country.name}`} />
        </picture>
        <section>
          <h1>{country?.name}</h1>
          <ul className="Statistics">
            <li>
              <strong>Native name:</strong> {country?.name}
            </li>
            <li>
              <strong>Population:</strong> {country?.population}
            </li>
            <li>
              <strong>Region:</strong> {country?.region}
            </li>
            <li>
              <strong>Sub Region:</strong> {country?.subregion}
            </li>
            <li>
              <strong>Capital:</strong> {country?.capital}
            </li>
            <li>
              <strong>Top Level Domain:</strong> {country?.topLevelDomain}
            </li>
            <li>
              <strong>Currencies:</strong>{" "}
              {country?.currencies.map(($) => `${$.name} (${$.symbol})`).join()}
            </li>
            <li>
              <strong>Languages:</strong>{" "}
              {country?.languages.map((lang) => lang.name).join()}
            </li>
          </ul>
        </section>
      </main>
      <p>
        <strong>Bordering countries:</strong>
        {country?.borders?.map((code) => (
          <BorderingCountry key={code} alpha3Code={code} />
        ))}
      </p>
    </div>
  );
}

function BorderingCountry({ alpha3Code }: { alpha3Code: string }) {
  return (
    <Link className="BorderingCountry" to={`/${alpha3Code}`}>
      {alpha3Code}
    </Link>
  );
}
