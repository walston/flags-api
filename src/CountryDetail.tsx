import { useParams } from "react-router";
import { Country, useGetCountryByCode } from "./api";
import { Link } from "react-router-dom";
import "./CountryDetail.css";

const format = Intl.NumberFormat("en-us");

export default function CountryDetail() {
  const params = useParams<{ alpha3Code: string }>();
  const country = useGetCountryByCode(params.alpha3Code || "");

  if (!country) return <p>{JSON.stringify(params)}</p>;

  return (
    <div className="CountryDetails">
      <nav>
        <Link className="button" to="/">
          {" "}
          ← Back{" "}
        </Link>
      </nav>
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
              <strong>Population:</strong>{" "}
              {country?.population ? format.format(country.population) : "--"}
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
          <p>
            <strong>Bordering countries:</strong>
            {country?.borders?.map((borderer) => (
              <BorderingCountry key={borderer.alpha3Code} country={borderer} />
            ))}
          </p>
        </section>
      </main>
    </div>
  );
}

function BorderingCountry({ country }: { country: Country }) {
  return (
    <Link className="button" to={`/${country.alpha3Code}`}>
      {country.name}
    </Link>
  );
}
