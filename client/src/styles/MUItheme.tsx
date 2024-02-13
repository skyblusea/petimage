import { createTheme } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { PaletteColor, SimplePaletteColorOptions } from "@mui/material/styles";

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body0: true;
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
  interface ButtonPropsVariantOverrides {
    reverseContained: true;
  }
  interface ButtonPropsColorOverrides {
    petimage: true;
  }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    petimage: true;
  }
}
declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    petimage: true;
  }
}
declare module '@mui/material/Fab' {
  interface FabPropsColorOverrides {
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
    error: {
      main: '#CE0000',
    },
    success: {
      main: '#00C337',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'reverseContained' },
          style: {
            textTransform: 'none',
            color: 'rgba(0, 0, 0, 0.26)',
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
            borderRadius: '100px',
            '&:hover': {
              backgroundColor: '#ff5658',
              color: '#fff',
            },
            }
        },
      ],
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.variant === 'contained' || ownerState.variant === 'outlined') && {
             borderRadius: '100px',
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
    h4: {
      fontSize: '40px',
      fontWeight: '700',
    },
    h2: {
      fontWeight: '700',
    },
    h5: {
      fontSize: '34px',
      fontWeight: '700',
    },
    h6: {
      fontWeight: '700', 
    },
    body0: {
      fontWeight: '400',
      fontSize: '1.5rem',
    },
    body1: {
      fontWeight: '400',
      fontSize: '1.125rem',
      letterSpacing: "0.00805em"
    },
    body2: {
      fontWeight: '400',
      fontSize: '1rem',
      letterSpacing: "0.00938em"
    },
    body3: {
      fontWeight: '400',
      fontSize: '0.875rem',
      letterSpacing: "0.01071em"
    },
    subtitle0: {
      fontSize: '1.5rem',
      letterSpacing: "0.00406em"
    },
    subtitle1: {
      fontSize: '18px',
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