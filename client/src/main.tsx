import React from 'react'
import ReactDOM from 'react-dom/client'
import { Global } from '@emotion/react'
import reset from './styles/GlobalStyles.tsx'
import theme from './styles/MUItheme.tsx'
import { ThemeProvider } from "@mui/material/styles";
import App from './App.tsx'







ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Global styles={reset} />
    <App />
  </ThemeProvider>
)
