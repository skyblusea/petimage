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
import { ThemeProvider } from "@mui/material/styles";
import Create from './page/create/page.tsx'
import SelectBreed from './page/create/[animal]/page.tsx'
import SelectAnimal from './page/create/SelectAnimalGrid.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { breedsLoader } from './util/loader.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Notice from './page/create/[animal]/notice/page.tsx'
import Upload from './page/create/[animal]/upload/page.tsx'
import Checkout from './page/create/[animal]/checkout/page.tsx'
import PaymentComplete from './page/payment-complete/page.tsx'
import Collection from './page/collection/page.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


const queryClient = new QueryClient()



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
      {
        path: '/create', element: <Create />, children: [
          { path: '', element: <SelectAnimal /> },
          {
            path: ':animal',
            element: <SelectBreed />,
            loader: breedsLoader(queryClient)
          },
          { path: ':animal/:breed/notice', element: <Notice /> },
          { path: ':animal/:breed/upload', element: <Upload /> },
          { path: ':animal/:breed/checkout', element: <Checkout /> },
        ]
      },
      { path: '/payment-complete', element: <PaymentComplete /> },
      { path: '/collection', element: <Collection /> },
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </GoogleOAuthProvider>
  </ThemeProvider>
  </React.StrictMode >,
)
