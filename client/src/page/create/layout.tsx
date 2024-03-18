import { SingleSection } from "../../components/Containers";
import { Outlet, useLoaderData, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import { themeQuery } from "./page";
import styled from "@emotion/styled";
import { Theme } from '../../types';
import useAuth from "../../util/useAuth";


export default function CreateLayout() {
  const params = useParams();
  const pathname = useLocation().pathname
  const initialData = useLoaderData() as Array<Theme>
  const { authClient, isAuthenticated } = useAuth()
  const { data: theme } = useQuery({
    ...themeQuery(authClient),
    initialData: initialData ? initialData : undefined,
    enabled: isAuthenticated,
  })
  
  const selectedTheme = params.theme
  const bg = selectedTheme && theme?.filter(ele => ele.name === selectedTheme)[0].background

  
  return (
    <ThemedBG bg={bg} pathname={pathname}>
        <Outlet />
    </ThemedBG>
  )
}

interface ThemedBGProps {
  bg?: string
  pathname?: string
}


export const ThemedBG = styled(SingleSection) <ThemedBGProps>`
  ${props => props.bg && props.bg !== 'https://img.freepik.com/free-photo/abstract-surface-and-textures-of-white-concrete-stone-wall_74190-8189.jpg?size=626&ext=jpg&ga=GA1.1.1788068356.1707004800&semt=ais'
  ? `
    background-image: url('${props.bg}');
    background-position-x: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
  `
  :`
    background-color: ${props.pathname==='/checkout' ?'white' :'var(--petimage)'};
    height: 100%;
  `
}

`

