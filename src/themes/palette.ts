export default function themPalette() {
  return {
    neutral: {
      main: '#fff',
      contrastText: '#2d3948',
    },
    dark: {
      main: '#20232a',
      contrastText: '#ffffff',
    },
    // action: {
    //   active: '#61dafb',
    //   hover: '#bbeffd4d',
    // },
  };
}

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    dark: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    dark?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    dark: true;
  }
}
