import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { ColorScheme, getUserColorSchemePreference } from "./util";

const preference = window.matchMedia("(prefers-color-scheme: dark)");

export default function DarkMode() {
  const [mode, setMode] = useState<ColorScheme>(getUserColorSchemePreference());

  useEffect(() => {
    document.body.classList.add(mode);
    return () => {
      document.body.classList.remove("light", "dark");
    };
  }, [mode]);

  useEffect(() => {
    const changer = (e: MediaQueryListEvent) =>
      setMode(e.matches ? "dark" : "light");

    preference.addEventListener("change", changer);
    return () => preference.removeEventListener("change", changer);
  }, []);

  return (
    <button
      onClick={() => setMode((prev) => (prev === "dark" ? "light" : "dark"))}
    >
      {mode === "dark" ? (
        <>
          <SunIcon /> Light Mode
        </>
      ) : (
        <>
          <MoonIcon /> Dark Mode
        </>
      )}
    </button>
  );
}
