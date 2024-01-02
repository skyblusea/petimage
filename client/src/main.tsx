import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root.tsx'
import Home from './page/home/page.tsx'
import Service from './page/service/page.tsx'
import Product from './page/product/page.tsx'
import About from './page/about/page.tsx'
import { Global } from '@emotion/react'
import reset from './styles/GlobalStyles.tsx'
import theme from './styles/MUItheme.tsx'
import {ThemeProvider} from "@mui/material/styles";
import Create from './page/create/page.tsx'
import Trial from './page/trial/page.tsx'
import SelectBreed from './page/create/SelectBreed.tsx'
import SelectAnimal from './page/create/SelectAnimal.tsx'
import Upload from './page/create/Upload.tsx'

// Data API 사용위한 Router 선언 방식
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Home /> },
      { path: '/service', element: <Service /> },
      { path: '/product', element: <Product /> },
      { path: '/about', element: <About /> },
      { path: '/create', element: <Create />, children: [
        { path: '', element: <SelectAnimal /> },
        { path: ':animal', 
          element: <SelectBreed />,
          loader: async ({ params }) => {
            const animal = params.animal === 'dog' ? '%EA%B0%95%EC%95%84%EC%A7%80' : '%EA%B3%A0%EC%96%91%EC%9D%B4'
            return fetch(`/api/teams/${animal}.json`);
          },
        },
        { path: ':animal/:breed', element: <Upload /> },
      ]},
      { path: '/trial', element: <Trial /> },
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
