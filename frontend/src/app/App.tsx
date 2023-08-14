import React, { useState } from 'react';
import Home from './../features/home/Home';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import ThemeSwitcher from './common/ThemeSwitcher';
import NavBar from '../features/navbar/Navbar';

function App() {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = createTheme({
        palette: {
            mode: themeMode,
            ...(themeMode === 'dark'
                ? {
                    primary: {
                        main: '#18BFFF', // Dark mode primary color
                    },
                    secondary: {
                        main: '#B666FF', // Dark mode secondary color
                    },
                  }
                : {
                    primary: {
                        main: '#1976D2', // Light mode primary color (placeholder)
                    },
                    secondary: {
                        main: '#DC004E', // Light mode secondary color (placeholder)
                    },
                  })
        },
    });

    return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
              <NavBar />
              <Home />
              <ThemeSwitcher themeMode={themeMode} toggleTheme={toggleTheme} />
          </div>
      </ThemeProvider>
  );
}

export default App;