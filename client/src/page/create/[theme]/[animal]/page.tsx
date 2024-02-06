import { redirect, useLoaderData, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import BaseImgBox from "../../../../components/Boxes";
import type { Params } from '@remix-run/router/utils';
import { QueryClient } from "@tanstack/react-query"
import { Breed } from "../../../../types";
import { apiClient } from "../../../../util/axiosInstance";




export const breedsQuery = (animal: string) => ({
  queryKey: ['breeds', animal],
  queryFn: async (): Promise<Array<Breed>> => {
    const en = animal === 'dog' ? '강아지' : '고양이'
    const { data: { data } } = await apiClient.get(`/animal/list?class=${en}`)
    return data
  },
  staleTime: 1000 * 60 * 60 * 24 // 1 days
})


export const loader =
  (queryClient: QueryClient) =>
    async ({ params }: { params: Params }) => {
      const { animal } = params
      if (animal !== 'dog' && animal !== 'cat') {
        alert('잘못된 접근입니다.')
        redirect('/create')
      }
      const query = breedsQuery(animal ?? 'dog')
      const data = queryClient.ensureQueryData(query)
      return data
    }



export default function SelectBreed() {

  const breeds = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;
  const pathname = useLocation().pathname;

  return (
    <Grid container spacing={2}>
      {breeds?.map((breed) => (
        <Grid xs={4} md={3} lg={12 / 5} key={breed._id}>
          <BaseImgBox hover view square to={`${pathname}/${breed.code}/notice`} src={breed.img} alt={breed.name}>
            <Typography component="span" sx={{
              color: 'primary',
              typography: { xs: 'subtitle2', lg: 'subtitle1' }
            }}>
              {breed.name}
            </Typography>
          </BaseImgBox>
        </Grid>
      ))}
    </Grid>
  )
}

