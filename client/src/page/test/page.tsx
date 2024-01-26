import { useLocation, useRouteLoaderData } from "react-router-dom"

export default function Test ( ){ 

  const state = useLocation().state
  console.log('state', state)
  const {createAlbumData} = state
  console.log('createAlbumData', createAlbumData)

  return <div>ee</div>
}