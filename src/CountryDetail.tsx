import { useParams } from "react-router";
import { useGetCountryByCode } from "./api";

export default function CountryDetail() {
  const params = useParams<{ alpha3Code: string }>();
  const country = useGetCountryByCode(params.alpha3Code || "");

  if (!country) return <p>{JSON.stringify(params)}</p>;

  return <pre>{JSON.stringify(country, null, "  ")}</pre>;
  /**
<button> Back
<img alt="flag">
   *
Native Name: Belgie
Population: 11,319,511
Region: Europe
Sub Region: Western Europe
Capital: Brussels
Top Level Domain: .be
Currencies: Euro
Languages: Dutch, French, German
   *
Border Countries: Country.name[]
   */
}
