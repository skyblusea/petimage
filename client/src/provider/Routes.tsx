import { Outlet, RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import useAuth from "../util/useAuth";
import Error from "../error";
import Home from "../page/home/page";
import Login from "../page/login/page";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import RootLayout from "../RootLayout";
import Service from "../page/service/page";
import Product from "../page/product/page";
import About from "../page/about/page";
import SelectTheme, { loader as themeLoader } from "../page/create/page";
import Notice from "../page/create/[theme]/[animal]/[breed]/notice/page";
import CreateLayout from "../page/create/[theme]/layout";
import SelectAnimal from "../page/create/[theme]/SelectAnimalGrid";
import SelectBreed, { loader as breedLoader } from "../page/create/[theme]/[animal]/page";
import Upload, { loader as uploadLoader } from "../page/create/[theme]/[animal]/[breed]/upload/page";
import PaymentSuccess, { loader as paymentSuccessLoader, action as paymentSuccessAction } from "../page/payment/success/page";
import Collection, { loader as collectionLoader } from "../page/collection/page";
import Checkout, { loader as checkoutLoader } from "../page/payment/checkout/page";
import usePayment from "../util/usePaymemt";
import ProtectedRoute from "../components/ProtectedRoute";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const Routes = () => {

  const auth = useAuth();
  const { paymentDetails } = usePayment()
  const queryClient = new QueryClient()


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
          loader: async () => {
            return auth.isAuthenticated
          }, // Loader을 통한 ProtectedRoute 는 새로고침 시 token 정보가 없어서 로그인이 필요합니다. 라고 뜸
          children: [
            {
              path: '/create',
              element: <SelectTheme />,
              loader: themeLoader(queryClient),
            },
            { path: '/create/:theme/:animal/:breed/notice', element: <Notice /> },
            {
              path: '/create/:theme', element: <CreateLayout />, children: [
                { path: '', element: <SelectAnimal /> },
                { path: ':animal', element: <SelectBreed />, loader: breedLoader(queryClient) },
                { path: ':animal/:breed/upload', element: <Upload /> },
              ],
              loader: uploadLoader(queryClient)
            },
            {
              path: '/payment', element: <CreateLayout />, children: [
                { path: 'checkout', element: <Checkout />, loader: async () => {
                  console.log('checkout loader',paymentDetails)
                  checkoutLoader(queryClient, paymentDetails, auth.token) 
                }},
              ]
            },
            { path: '/payment/success', element: <PaymentSuccess />, loader: paymentSuccessLoader, action: paymentSuccessAction },
            { path: '/collection', element: <Collection />, loader: collectionLoader(queryClient) },
            { path: '/payments', element: <Collection />, loader: collectionLoader(queryClient) },
          ]
        },

      ]
    },



  ])







  // Provide the router configuration using RouterProvider
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )

};

export default Routes;