import React from "react";
import { Button } from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface ThemeSwitcherProps {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  themeMode,
  toggleTheme,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      <Button onClick={toggleTheme}>
        {themeMode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
