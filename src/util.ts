export type ColorScheme = "dark" | "light";
export function getUserColorSchemePreference(): ColorScheme {
  const colorSchemePref = window.matchMedia("(prefers-color-scheme: dark)");
  if (colorSchemePref.matches) return "dark";
  else return "light";
}
