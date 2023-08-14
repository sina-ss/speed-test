import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Theme,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import BarChartIcon from "@mui/icons-material/BarChart";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: "4.5rem",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: "4.6rem",
    border: "none",
    boxShadow: "8px 0 8px rgba(21,105,137,0.3)",
    boxSizing: "border-box",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "&.MuiDrawer-paperExpanded": {
      width: "12rem",
    },
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    top: "auto", // This is important to override the default top: 0 set by MUI
    "& .MuiDrawer-paper": {
      width: "100%",
      height: "4.5rem",
      position: "fixed",
      bottom: 0,
      top: "auto",
      flexDirection: "row",
    },
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
  [theme.breakpoints.down("sm")]: {
    "&.rightAlign": {
      marginLeft: "auto",
    },
  },
}));

const NavBar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <StyledDrawer
      variant="permanent"
      PaperProps={expanded ? { className: "MuiDrawer-paperExpanded" } : {}}
    >
      <StyledList sx={{ width: "100%" }}>
        {!isSmallScreen && (
          <ListItemButton onClick={() => setExpanded(!expanded)}>
            <ListItemIcon>
              <MenuIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            {expanded && <ListItemText primary="Menu" />}
          </ListItemButton>
        )}
        <StyledListItem component="a" href="/">
          <ListItemIcon>
            <SpeedIcon color="primary" fontSize="large" />
          </ListItemIcon>
          {expanded && !isSmallScreen && <ListItemText primary="Speedtest" />}
        </StyledListItem>
        <StyledListItem
          component="a"
          href="/statics"
          className={isSmallScreen ? "rightAlign" : ""}
        >
          <ListItemIcon>
            <BarChartIcon color="primary" fontSize="large" />
          </ListItemIcon>
          {expanded && !isSmallScreen && <ListItemText primary="Statics" />}
        </StyledListItem>
      </StyledList>
    </StyledDrawer>
  );
};

export default NavBar;
