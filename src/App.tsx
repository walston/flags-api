import { useState } from "react";
import { ColorScheme, getUserColorSchemePreference } from "./util";
import CountryGrid from "./CountryGrid";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryDetail from "./CountryDetail";

function App() {
  const [mode, setMode] = useState<ColorScheme>(getUserColorSchemePreference());

  return (
    <div className="App">
      <header>
        <h1>Where in the world?</h1>
        <button
          onClick={() =>
            setMode((mode) => (mode === "dark" ? "light" : "dark"))
          }
        >
          {mode === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
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
