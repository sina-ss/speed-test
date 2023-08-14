import React, { useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import BarChartIcon from '@mui/icons-material/BarChart';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: '4rem',
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: '4rem',
        boxSizing: 'border-box',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        '&.MuiDrawer-paperExpanded': {
            width: '240px',
        },
    },
}));

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const NavBar: React.FC = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <StyledDrawer variant="permanent" PaperProps={expanded ? { className: 'MuiDrawer-paperExpanded' } : {}}>
            <List>
                <ListItemButton onClick={() => setExpanded(!expanded)}>
                    <ListItemIcon>
                        <MenuIcon fontSize='large'/>
                    </ListItemIcon>
                    {expanded && <ListItemText primary="Menu" />}
                </ListItemButton>
                <StyledListItem component="a" href="/">
                    <ListItemIcon>
                        <SpeedIcon fontSize='large'/>
                    </ListItemIcon>
                    {expanded && <ListItemText primary="Speedtest" />}
                </StyledListItem>
                <StyledListItem component="a" href="/statics">
                    <ListItemIcon>
                        <BarChartIcon fontSize='large'/>
                    </ListItemIcon>
                    {expanded && <ListItemText primary="Statics" />}
                </StyledListItem>
            </List>
        </StyledDrawer>
    );
};

export default NavBar;