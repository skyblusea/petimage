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
import SelectAnimal from './page/create/[theme]/SelectAnimalGrid.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PaymentComplete from './page/payment-complete/page.tsx'
import Error from './error.tsx'
import Login from './page/login/page.tsx'
import AuthProvider from './provider/AuthProvider.tsx'
import LoadingProvider from './provider/LoadingProvider.tsx'
import Theme, { loader as themeLoader } from './page/create/page.tsx'
import CreateLayout from './page/create/[theme]/layout.tsx'
import SelectBreed, { loader as breedLoader } from './page/create/[theme]/[animal]/page.tsx'
import Trial from './page/trial/page.tsx'
import Upload from './page/create/[theme]/[animal]/[breed]/upload/page.tsx'
import Notice from './page/create/[theme]/[animal]/[breed]/notice/page.tsx'
import Checkout from './page/create/[theme]/[animal]/[breed]/checkout/page.tsx'





const queryClient = new QueryClient()



// Data API 사용위한 Router 선언 방식
// loader 는 fetching before amount 를 실현시킴
// react query와 결합하면 캐싱과 재사용을 통해 성능을 향상시킴(fetcing too often 방지)
const router = createBrowserRouter([
  {
    element: <AuthProvider />, // context 에서 router 사용하기 위해
    children: [
      {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
          { path: '', element: <Home /> },
          { path: '/login', element: <Login /> },
          { path: '/service', element: <Service /> },
          { path: '/product', element: <Product /> },
          { path: '/about', element: <About /> },
          { path: '/create', 
            element: <Theme />,
            loader: themeLoader(queryClient),
          },
          { path: '/create/:theme/:animal/:breed/notice', element: <Notice /> },
          {
            path: '/create/:theme', element: <CreateLayout />, children: [
              { path: '', element: <SelectAnimal /> },
              { path: ':animal', element: <SelectBreed />, loader: breedLoader(queryClient) },
              { path: ':animal/:breed/upload', element: <Upload /> },
              { path: ':animal/:breed/checkout', element: <Checkout /> },
            ]
          },
        ]
        // children: [
        //   {
        //     path: ':theme', element: <CreateLayout />, children: [
        //       { path: '', element: <SelectAnimal /> },
        // {
        //   path: '/dog',
        //   element: <SelectBreed />,
        //   loader: breedsLoader(queryClient)
        // },
        // { path: ':animal/:breed/notice', element: <Notice /> },
        // {
        //   path: ':animal/:breed/upload',
        //   element: <Upload />,
        //   action: async ({ params, request }) => {
        //     console.log('upload params', params)
        //     console.log('upload request', request)
        //     const formData = await request.formData()
        //     const updates = Object.fromEntries(formData)
        //     console.log('updates', updates)
        //   }
        // },
        // { path: ':animal/:breed/checkout', element: <Checkout /> },
        // ],
        // action: async ({ params, request }) => {
        //   console.log('upload params', params)
        //   console.log('upload request', request)
        //   const formData = await request.formData()
        //   const updates = Object.fromEntries(formData)
        //   console.log('updates', updates)
        // }
        // ]
      },
      { path: '/payment-complete', element: <PaymentComplete /> },
      { path: '/test', element: <Trial /> },
      // {
      //   path: '/test',
      //   action: async ({ params, request }) => {

      //   },
      //   element: <Trial />
      // },
      // {
      //   path: '/protectedcollection',
      //   element: <ProtectedRoute><Collection /></ProtectedRoute>,
      //   loader: collectionLoader(queryClient)
      // },
      // {
      //   path: '/collection',
      //   element: <Collection />,
      //   loader: collectionLoader(queryClient),
      // },
      // {
      //   path: '/payments',
      //   element: <Collection />,
      //   loader: collectionLoader(queryClient),
      // },
    ]
  }


])



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </LoadingProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode >,
)
