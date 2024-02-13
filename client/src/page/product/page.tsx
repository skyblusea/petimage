import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { PetimageThemeContainer, PetimegeThemeContent, PetimegeThemeHeader } from '../../components/Containers';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Theme } from '../../types';
import { apiClient } from '../../util/axiosInstance';
import Slider from './Slider';


export const adminThemeQuery = () => ({
  queryKey: ['adminTheme'],
  queryFn: async (): Promise<Array<Theme>> => {
    const { data: { data: { themes: data } } } = await apiClient.get('/theme/list', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer admin`
      },
    })
    const filtered = data.filter((ele: Theme) => ele.prompt.length > 0)
    return filtered
  },
  staleTime: 1000 * 60 * 60 * 24 // 1 days
})




export const loader = (queryClient: QueryClient) =>
  async () => {
    const query = adminThemeQuery()
    const data = queryClient.ensureQueryData(query)
    return data
  }



//TODO 추후 migration 필요

export default function Product() {

  const initialData = useLoaderData() as Array<Theme>
  const { data: theme } = useQuery({
    ...adminThemeQuery(),
    initialData,
  })

  const [tap, setTap] = useState(0)
  return (
    <PetimageThemeContainer>
      <PetimegeThemeHeader>
        <Typography variant='h4' color="secondary">Product</Typography>
      </PetimegeThemeHeader>
      <PetimegeThemeContent>
        <Grid container rowSpacing={4}>
          <Grid xs={12}>
            <Stack direction="row" spacing={1}>
              {theme.map((content, idx) =>
                <Chip key={content._id} color="primary" label={content.name} variant={idx === tap ? 'filled' : 'outlined'} onClick={() => setTap(idx)} />
              )}
            </Stack>
            <Slider tap={tap} theme={theme} />
          </Grid>
        </Grid>
      </PetimegeThemeContent>
    </PetimageThemeContainer >
  )
}


