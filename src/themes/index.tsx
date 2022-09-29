import React, { useMemo } from 'react';
import { createTheme, CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider, ThemeOptions } from '@mui/material/styles';

import palette from './palette';
import componentsOverrides from './componentsOverrides';

// -------------------------------------------------------------------

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

export default function CustomThemeProvider(props: CustomThemeProviderProps) {
  const { children } = props;
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette(),
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1100,
          xl: 1536,
        },
      },
      typography: {
        button: {
          textTransform: 'none',
        },
      },
    }),
    [],
  );
  const theme = createTheme(themeOptions);
  theme.components = componentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
