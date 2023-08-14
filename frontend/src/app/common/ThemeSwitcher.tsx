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
        bottom: "32px",
        right: "32px",
        zIndex: 1000,
      }}
    >
      <Button onClick={toggleTheme}>
        {themeMode === "light" ? <LightModeIcon fontSize="large"/> : <DarkModeIcon fontSize="large"/>}
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
