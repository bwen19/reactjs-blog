export default function themPalette() {
  return {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    dark: {
      main: '#222734',
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
