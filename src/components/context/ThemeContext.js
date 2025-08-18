import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function ThemeProvider  ({ children }) {
  const [theme, setTheme] = useState(null); // initially unknown
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeLoaded }}>
      {themeLoaded ? children : null} 
      {/* You can replace null with a loader */}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;