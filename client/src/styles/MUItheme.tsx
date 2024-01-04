import { createTheme } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { PaletteColor, SimplePaletteColorOptions } from "@mui/material/styles";

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    subtitle3: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    petimage: PaletteColor;

  }

  interface PaletteOptions {
    petimage: SimplePaletteColorOptions;

  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    petimage: true;
  }
}
declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    petimage: true;
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  body3: React.CSSProperties;
  subtitle3: React.CSSProperties;
}

const theme = createTheme({
  palette: {
    petimage: {
      main: '#ff5658',
      contrastText: "#fff" // 버튼 text color
    },
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.variant === 'contained' || ownerState.variant === 'outlined') && {
             borderRadius: '24px',
            }),
        }),
      }, 
    }, 
  },

  typography: {
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'sans-serif',
    ].join(','),
    h2: {
      fontWeight: '400',
    },
    body1: {
      margin: "0px 0px 0.35em",
      fontWeight: '400',
      fontSize: '1.125rem',
      letterSpacing: "0.00805em"
    },
    body2: {
      margin: "0px 0px 0.35em",
      fontWeight: '400',
      fontSize: '1rem',
      letterSpacing: "0.00938em"
    },
    body3: {
      margin: "0px 0px 0.35em",
      fontWeight: '400',
      fontSize: '0.875rem',
      letterSpacing: "0.01071em"
    },
    subtitle0: {
      fontSize: '1.5rem',
      letterSpacing: "0.00406em"
    },
    subtitle1: {
      fontSize: '1.375rem',
      letterSpacing: "0.00539em"
    },
    subtitle2: {
      fontSize: '1.25rem',
      letterSpacing: "0.00672em"
    },
    subtitle3: {
      fontSize: '1.125rem',
      letterSpacing: "0.00805em"
    },
  } as ExtendedTypographyOptions,
})


export default theme;