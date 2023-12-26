import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// MUI theme
const theme = createTheme({
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
  typography: {
    fontFamily: [
      "Pretendard",
    ].join(','),
  },
});

export default theme;