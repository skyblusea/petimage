import { QueryClient } from "@tanstack/react-query"
import { Breed } from "../types";
import axios from "axios";
import type { Params } from '@remix-run/router/utils';


export const breedsQuery = (animal: string) => ({
  queryKey: ['breeds', animal],
  queryFn: async () :Promise<Array<Breed>>=> {
    const en = animal === 'dog' ? '강아지' : '고양이'
    const { data: { data } } = await axios.get(`https://petimage.kr/api/v1/animal/list?class=${en}`)
    return data
  },
  staleTime: 1000 * 60 * 60 * 24 * 7 // 7 days
})


export const breedsLoader = (queryClient:QueryClient) => async ({params}:{params:Params}) => {
  const query = breedsQuery(params.animal ?? 'dog')
  const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
  return data
}


// export const breedsLoader2 = (queryClient: QueryClient) => async ({ params }: Params<string>) => {
//   const { animal } = params; 
//   return queryClient.fetchQuery({
//     queryKey: ['breeds', animal],
//     queryFn: async (): Promise<Array<Breed>> => {
//       const { data: { data } } = await axios.get(`https://petimage.kr/api/v1/animal/list?class=${animal}`);
//       return data;
//     }
//   });
// }