
import { PetimageThemeContainer, PetimegeThemeHeader, PetimegeThemeContent, RoundPaper } from "../../components/Containers";
import styled from "@emotion/styled"
import { useQuery } from "@tanstack/react-query";
import Album from "./Album";
import { QueryClient } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { AlbumItem } from "../../types";
import { AxiosInstance } from "axios";
import useAuth from "../../util/useAuth";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';




const collectionQuery = (authClient: AxiosInstance) => ({
  queryKey: ["collection"],
  queryFn: async () => {
    const { data: { data: collection } } = await authClient.get(`/album/list?sort=&order=&limit=&page=`)
    return collection as AlbumItem[]
  },
  // staleTime: 1000 * 60 * 5, // 5 minutes
});


export const loader = (queryClient: QueryClient, authClient: AxiosInstance) =>
  async () => {
    const query = collectionQuery(authClient);
    try {
      const data = await queryClient.fetchQuery(query)
      return data;
    } catch (error) {
      queryClient.removeQueries(query);
      return null;
    }
  }


export default function Collection() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
  const { authClient, isAuthenticated } = useAuth()
  const { data: albums } = useQuery({
    ...collectionQuery(authClient),
    initialData: initialData ? initialData : undefined,
    enabled: isAuthenticated,
  })


  return (
    <PetimageThemeContainer>
      <PetimegeThemeHeader>
        <Box display="flex" flexGrow={1}>
          <Typography variant="h4" color="secondary">갤러리</Typography>
        </Box>
      </PetimegeThemeHeader>
      <PetimegeThemeContent full>
        {albums && albums.length > 0
          ? <Stack spacing={2}>{albums.map((album) => <Album key={album._id} data={album} />)}</Stack>
          : <Typography variant="h6">생성한 이미지가 없습니다.</Typography>
        }
      </PetimegeThemeContent>
    </PetimageThemeContainer>
  )
}


export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`


export const Tab = styled.button`
  height: 100%;
  font-size: var(--h2);
  font-weight: bold;
  transition: .3s;
  color: #8f8f8f;
  position: relative;
  padding: var(--pd-md);
  :after {
    content: "";
    width: 100%;
    height: 0.375rem;
    position: absolute;
    background-color: var(--petimage);
    left: 0;
    bottom: 0;
    opacity: 0;
  }
  &[aria-selected="true"]{
    color: var(--petimage);
    span {
      color: var(--petimage);
    }
    ::after {
    opacity: 1;
    }
  }
`

export const Tabs = styled(RoundPaper)`
  display: flex;
  width: 100%;
  flex-direction: row;
  max-width: 900px;
  justify-content: space-around;
  align-items: center;
  margin-bottom: var(--gap-lg);
`


export const TabPanel = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-lg);
`