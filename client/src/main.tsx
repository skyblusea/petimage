import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root.tsx'
import Home from './page/home/page.tsx'
import Service from './page/service/page.tsx'
import Product from './page/product/page.tsx'
import About from './page/about/page.tsx'
import { Global, ThemeProvider } from '@emotion/react'
import reset from './styles/GlobalStyles.tsx'
import theme from './styles/theme.tsx'
import { CssBaseline } from '@mui/material';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/service', element: <Service /> },
      { path: '/product', element: <Product /> },
      { path: '/about', element: <About /> },
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={reset} />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
