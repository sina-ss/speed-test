import React, { useState } from "react";
import Home from "./../features/home/Home";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import ThemeSwitcher from "./common/ThemeSwitcher";
import NavBar from "../features/navbar/Navbar";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Statics from "../features/statics/Statics";

function App() {
  const initialThemeMode =
    (localStorage.getItem("themeMode") as "light" | "dark" | null) || "light";

  const [themeMode, setThemeMode] = useState<"light" | "dark">(
    initialThemeMode
  );

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === "dark"
        ? {
            primary: {
              main: "#18BFFF", // Dark mode primary color
            },
            secondary: {
              main: "#B666FF", // Dark mode secondary color
            },
          }
        : {
            primary: {
              main: "#1976D2", // Light mode primary color (placeholder)
            },
            secondary: {
              main: "#DC004E", // Light mode secondary color (placeholder)
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>  
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/statics" element={<Statics />}/>
        </Routes>
        <ThemeSwitcher themeMode={themeMode} toggleTheme={toggleTheme} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
