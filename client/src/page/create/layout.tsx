import { SingleSection } from "../../components/Containers";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import { themeQuery } from "./page";
import styled from "@emotion/styled";
import { Theme } from '../../types';
import useAuth from "../../util/useAuth";


export default function CreateLayout() {
  const params = useParams();
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
    <ThemedBG bg={bg}>
      <Outlet />
    </ThemedBG>
  )
}

interface ThemedBGProps {
  bg?: string
}

const ThemedBG = styled(SingleSection) <ThemedBGProps>`
  ${props => props.bg && `background-image: url(${props.bg})`}
`
