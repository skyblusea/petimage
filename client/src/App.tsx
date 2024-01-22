import AuthProvider from './provider/AuthProvider.tsx'
import LoadingProvider from './provider/LoadingProvider.tsx'
import Routes from './provider/Routes.tsx'
import PaymentProvider from './provider/OrderProvider.tsx'

import { Outlet, RouterProvider, createBrowserRouter, redirect } from "react-router-dom";

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
import SelectTheme, { loader as themeLoader } from "./page/create/page";
import Notice from "./page/create/[theme]/[animal]/[breed]/notice/page";
import CreateLayout, { loader as themeDataLoader } from "./page/create/[theme]/layout";
import SelectAnimal from "./page/create/[theme]/SelectAnimalGrid";
import SelectBreed, { loader as breedLoader } from "./page/create/[theme]/[animal]/page";
import Upload from "./page/create/[theme]/[animal]/[breed]/upload/page";
import PaymentSuccess, { loader as paymentSuccessLoader, action as paymentSuccessAction } from "./page/payment/success/page";
import Collection, { loader as collectionLoader } from "./page/collection/page";
import Checkout, { loader as checkoutLoader } from "./page/payment/checkout/page";
import usePayment from "./util/usePaymemt";
import ProtectedRoute from "./components/ProtectedRoute";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import useAuth from './util/useAuth.ts';


export default function App() {



  const queryClient = new QueryClient()
  const auth = useAuth();
  console.log('auth', auth)

  const router = createBrowserRouter([
    {
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
          // loader: async () => {
          // console.log('auth.isAuthenticated', auth.isAuthenticated)
          // return auth.isAuthenticated
          // }, Loader을 통한 ProtectedRoute 는 새로고침 시 token 정보가 없어서 로그인이 필요합니다. 라고 뜸
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
                { path: ':animal/:breed/upload', element: <Upload /> },
              ],
              loader: themeDataLoader(queryClient)
            },
            {
              path: '/payment', element: <CreateLayout />, children: [
                { path: 'checkout', element: <Checkout /> },
              ]
            },
            { path: '/payment/success', element: <PaymentSuccess />, loader: paymentSuccessLoader, action: paymentSuccessAction },
            { path: '/collection', element: <Collection />, loader: collectionLoader(queryClient) },
            { path: '/payments', element: <Collection />, loader: collectionLoader(queryClient) },
          ]
        },
      ]
    }])

  return (

    <AuthProvider>
      <PaymentProvider>
        <LoadingProvider>
          {/* 기존 방식 */}
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          {/* loader 에서 auth context를 사용하기 위한 방식 */}
          {/* <Routes /> */}
        </LoadingProvider>
      </PaymentProvider>
    </AuthProvider>

  )
}