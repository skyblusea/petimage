import React, { useContext } from 'react'
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

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Notice from './page/create/[animal]/notice/page.tsx'
import Upload from './page/create/[animal]/upload/page.tsx'
import Checkout from './page/create/[animal]/checkout/page.tsx'
import PaymentComplete from './page/payment-complete/page.tsx'
import Collection from './page/collection/page.tsx'
import { breedsLoader } from './util/loaders/breedLoader.ts'
import Trial from './page/trial/page.tsx'
import Error from './error.tsx'
import Login from './page/login/page.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import { collectionLoader } from './util/loaders/collectionLoader.ts'
import { TestProvider } from './provider/testProvider.tsx'
import axios, { AxiosInstance } from 'axios'

import type { Params } from '@remix-run/router/utils';
import { testClinet } from './util/axiosInstance.ts'

const queryClient = new QueryClient()


const testLoader = (apiClient: AxiosInstance) => async ({
  params, request
}: {
  params: Params
  request: Request
}) => {
  try {
    console.log('testLoader', params, request)
    const collection = await apiClient.get(`/payment/list?sort=&order=&limit=&page=`)
    console.log('collection', collection)
  } catch (err) {
    console.log('err', err)
  }
  // console.log('드디러 로더에서 user 참조?!', user)
  return null
}

const testLoader2 = async ({
  params, request
}: {
  params: Params
  request: Request
}) => {
  console.log('test2', params, request)
  try {
    console.log('testLoader', params, request)
    const collection = await testClinet.get(`/payment/list?sort=&order=&limit=&page=`)
    console.log('collection', collection)
  } catch (err) {
    console.log('err', err)
  }
  // console.log('드디러 로더에서 user 참조?!', user)
  return null
}

// Data API 사용위한 Router 선언 방식
// loader 는 fetching before amount 를 실현시킴
// react query와 결합하면 캐싱과 재사용을 통해 성능을 향상시킴(fetcing too often 방지)
const router = createBrowserRouter([
  {
    // element: <TestProvider />, //! 이 방법은 provider내에 router이 live 되게 함 -> 로그인 후 navigation 가능
    // loader: testLoader(testClient),
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
          {
            path: '/create', element: <Create />, children: [
              { path: '', element: <SelectAnimal /> },
              {
                path: ':animal',
                element: <SelectBreed />,
                loader: breedsLoader(queryClient)
              },
              { path: ':animal/:breed/notice', element: <Notice /> },
              {
                path: ':animal/:breed/upload',
                element: <Upload />,
                action: async ({ params, request }) => {
                  console.log('upload params', params)
                  console.log('upload request', request)
                  const formData = await request.formData()
                  const files = formData.getAll('files')
                  console.log('files', files)
                }
              },
              { path: ':animal/:breed/checkout', element: <Checkout /> },
            ]
          },
          { path: '/payment-complete', element: <PaymentComplete /> },
          {
            path: '/test',
            action: async ({ params, request }) => {
              console.log('upload params', params)
              console.log('upload request', request)
              const formData = await request.formData()
              const files = formData.getAll('files')
              console.log('files', files)
            },
            element: <Trial />
          },
          // {
          //   path: '/protectedcollection',
          //   element: <ProtectedRoute><Collection /></ProtectedRoute>,
          //   loader: collectionLoader(queryClient)
          // },
          {
            path: '/collection',
            element: <Collection />,
            loader: testLoader2
            // ({ params, request }) => {
            //   console.log('collection params', params)
            //   console.log('collection request', request)
            //   console.log('collection headers', request.headers)

            //   for (const key of request.headers.keys()) {
            //     console.log(key);
            //   }
            //   console.log('collection headers token', request.headers.get('Authorization'))
            //   return collectionLoader(queryClient)
            // }
          },
        ]
      },
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <TestProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </TestProvider>
    </ThemeProvider>
  </React.StrictMode >,
)
