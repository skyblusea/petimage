import AuthProvider from './provider/AuthProvider.tsx'
import LoadingProvider from './provider/LoadingProvider.tsx'
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./error";
import Home from "./page/home/page";
import Login from "./page/login/page";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import RootLayout from "./RootLayout";
import Service from "./page/service/page";
import Product from "./page/product/page";
import About from "./page/about/page";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SelectTheme, { loader as themeLoader } from "./page/create/page";
import Notice from "./page/create/[theme]/[animal]/[breed]/notice/page";
import CreateLayout, { loader as themeDataLoader } from "./page/create/[theme]/layout";
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
import Test from './page/test/page.tsx';


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
          { path: '/product', element: <Product /> },
          { path: '/about', element: <About /> },
          { path: '/auth', element: <Login /> },
          // protected
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: '/create',
                element: <SelectTheme />,
                loader: themeLoader(queryClient),
              },
              { path: '/create/:theme/:animal/:breed/notice', element: <Notice /> },
              {
                id: 'createWithTheme',
                path: '/create/:theme', element: <CreateLayout />, children: [
                  { path: '', element: <SelectAnimal /> },
                  { path: ':animal', element: <SelectBreed />, loader: breedLoader(queryClient) },
                  { path: ':animal/:breed/upload', element: <LoadingProvider><Upload /></LoadingProvider>},
                ],
                loader: themeDataLoader(queryClient)
              },
              {
                path: '/checkout', element: <CreateLayout />, children: [
                  { path: '', element: <Checkout />},
                ]
              },
              { path: '/payment/:paymentId', loader : redirectLoader, element: <Redirect/>},
              { path: '/payment', element: <Test />},
              { path: '/payment-complete', element: <PaymentComplete /> },
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