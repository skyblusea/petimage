import { QueryClient } from "@tanstack/react-query"
import { Breed } from "../types";
import axios from "axios";


const breedsQuery = (animal: string) => ({
  queryKey: ['breeds', animal],
  queryFn: async () => {
    const { data: { data } } = await axios.get(`https://petimage.kr/api/v1/animal/list?class=${animal}`)
    return data
  }
})


export const breedsLoader = (queryClient:QueryClient) => async ({ params }: { params: { animal: string } }) :Promise<Array<Breed>> => {
  const query = breedsQuery(params.animal)
  const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))

  // const animal = params.animal === 'dog' ? '강아지' : '고양이'
  // const { data: { data } } = queryClient.fetchQuery('breeds', `https://petimage.kr/api/v1/animal/list?class=${animal}`);

  return data
}


export const breedsLoader2 = (queryClient: QueryClient) => async ({ params }: { params: { animal: string } }) => {
  const { animal } = params; 
  return queryClient.fetchQuery({
    queryKey: ['breeds', animal],
    queryFn: async (): Promise<Array<Breed>> => {
      const { data: { data } } = await axios.get(`https://petimage.kr/api/v1/animal/list?class=${animal}`);
      return data;
    }
  });
}