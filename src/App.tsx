import { useGetCountryList } from "./api";
import CountryCard from "./CountryCard";
import "./App.css";

function App() {
  const countries = useGetCountryList();
  return (
    <div className="App">
      {countries?.map((country) => {
        return <CountryCard country={country} />;
      })}
    </div>
  );
}

export default App;
