import { QueryClient } from "@tanstack/react-query";
import { authClient } from "../axiosInstance";
import { AlbumItem, Payment } from "../../types";


export const paymentQuery = () => ({
  queryKey: ["payment"],
  queryFn: async () => {
    try {
      const res = await authClient.get(`/payment/list?sort=&order=&limit=&page=`);
      if (res.status === 200) {
        console.log('paymentQuery res', res)
        const paymentList = res.data.data.payments as Payment[];
        return paymentList;
      }
    } catch (error) {
      console.error('paymentQuery error')
    }
  },
  staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
});

export const albumQuery = () => ({
  queryKey: ["Album"],
  queryFn: async () => {
    try {
      const res = await authClient.get(`/album/list?sort=&order=&limit=&page=`);
      if (res.status === 200) {
        console.log('albumQuery res', res)
        const paymentList = res.data.data as AlbumItem[];
        return paymentList;
      }
    } catch (error) {
      console.error('paymentQuery error')
    }
  },
  staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
});

export const collectionLoader = (queryClient: QueryClient) => async () => {
  const payment = paymentQuery();
  const album = albumQuery();
  const data = {
    payment: queryClient.getQueryData(payment.queryKey) ?? (await queryClient.fetchQuery(payment)),
    album: queryClient.getQueryData(album.queryKey) ?? (await queryClient.fetchQuery(album)),
  };
  return data;
};
