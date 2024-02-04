import CountryGrid from "./CountryGrid";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryDetail from "./CountryDetail";
import DarkMode from "./DarkMode";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Where in the world?</h1>
        <DarkMode />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<CountryGrid />} />
          <Route path=":alpha3Code" element={<CountryDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
