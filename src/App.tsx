import { useState } from "react";

import { ColorScheme, getUserColorSchemePreference } from "./util";

import "./App.css";
import CountryGrid from "./CountryGrid";

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
      <CountryGrid />
    </div>
  );
}

export default App;
