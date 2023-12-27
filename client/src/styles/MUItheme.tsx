import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import { TypographyOptions } from '@mui/material/styles/createTypography';


declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    subtitle3: true;
  }
}


interface ExtendedTypographyOptions extends TypographyOptions {
  body3: React.CSSProperties;
  subtitle3: React.CSSProperties;
}

// breatkpoint 변수 사용 위해 먼저 선언
let theme = createTheme()

// MUI theme
theme = createTheme(theme, {
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          [theme.breakpoints.up('lg')]: {
            
          },
        }
      },
    },
  },
  typography: {
    fontFamily: [
      "Pretendard",
    ].join(','),
    h2: {
      fontWeight: '400',
    },
    body1:{
      margin: "0px 0px 0.35em",
      fontWeight: '400',
      fontSize: '1.125rem',
      letterSpacing: "0.00805em"
    },
    body2:{
      margin: "0px 0px 0.35em",
      fontWeight: '400',
      fontSize: '1rem',
      letterSpacing: "0.00938em"
    },
    body3:{
      margin: "0px 0px 0.35em",
      fontWeight: '400',
      fontSize: '0.875rem',
      letterSpacing: "0.01071em"
    },
    subtitle0:{
      fontSize: '1.5rem',
      letterSpacing: "0.00406em"
    },
    subtitle1:{
      fontSize: '1.375rem',
      letterSpacing: "0.00539em"
    },
    subtitle2:{
      fontSize: '1.25rem',
      letterSpacing: "0.00672em"
    },
    subtitle3:{
      fontSize: '1.125rem',
      letterSpacing: "0.00805em"
    },
  } as ExtendedTypographyOptions,
});

export default theme;