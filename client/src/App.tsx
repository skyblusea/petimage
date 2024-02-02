import AuthProvider from './provider/AuthProvider.tsx'
import LoadingProvider from './provider/LoadingProvider.tsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./error";
import Home from "./page/home/page";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import RootLayout from "./RootLayout";
import Service from "./page/service/page";
import Product, { loader as productLoader } from "./page/product/page";
import About from "./page/about/page";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SelectTheme, { loader as themeLoader } from "./page/create/page";
import Notice from "./page/create/[theme]/[animal]/[breed]/notice/page";
import CreateLayout from "./page/create/layout";
import SelectAnimal from "./page/create/[theme]/SelectAnimalGrid";
import SelectBreed, { loader as breedLoader } from "./page/create/[theme]/[animal]/page";
import Collection, { loader as collectionLoader } from "./page/collection/page";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from './page/checkout/page.tsx';
import PaymentComplete from './page/payment-complete/page.tsx';
import Upload from './page/create/[theme]/[animal]/[breed]/upload/page.tsx';
import Redirect, { loader as redirectLoader } from './page/payment/Redirect.tsx';
import axios from 'axios';
import PaymentHistory, { loader as paymenyHistoryLoader } from './page/payment/history/page.tsx';
import Payment from './page/payment/page.tsx';
import PaymentFail from './page/payment/fail/page.tsx';
import ThemeLayout from './page/create/[theme]/layout.tsx';


function newApiClient() {
  return axios.create({
    baseURL: `${import.meta.env.VITE_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function App() {

  const queryClient = new QueryClient()
  const authClient = newApiClient() //for using singleton axios instance

  const router = createBrowserRouter([{
    element: <AuthProvider queryClient={queryClient} authClient={authClient}/>,
    children:
      [{
        path: '/',
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
          // public
          { path: '', element: <Home /> },
          { path: '/service', element: <Service /> },
          { path: '/product', element: <Product />, loader: productLoader(queryClient) },
          { path: '/about', element: <About /> },
          // protected
          {
            element: <ProtectedRoute />,
            children: [
              {
                id: 'theme',
                loader: themeLoader(queryClient, authClient),
                path: '', element: <CreateLayout />, children: [
                  {
                    path: '/create',
                    element: <ThemeLayout />, children: [
                      { path: '', element: <SelectTheme /> },
                      { path: ':theme', element: <SelectAnimal /> },
                      { path: ':theme/:animal', element: <SelectBreed />, loader: breedLoader(queryClient) },
                      { path: ':theme/:animal/:breed/notice', element: <Notice />},
                      { path: ':theme/:animal/:breed/upload', element: <LoadingProvider><Upload /></LoadingProvider>},
                    ]
                  },
                  {
                    path: '/checkout', element: <ThemeLayout />, children: [
                      { path: '', element: <Checkout />},
                    ]
                  },
                  { path: '/payment/:paymentId', loader : redirectLoader, element: <Redirect/>},
                  { path: '/payment', element: <LoadingProvider><Payment /></LoadingProvider>},
                  { path: '/payment/fail', element: <PaymentFail />},
                  { path: '/payment-complete', element: <PaymentComplete /> },
                ],
              },
              { path: '/collection', element: <Collection />, loader: collectionLoader(queryClient, authClient) },
              { path: '/payment/history', element: <PaymentHistory />, loader: paymenyHistoryLoader(queryClient, authClient)},
            ]
          },
        ]
      }]
  }
  ])


  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

  )
}