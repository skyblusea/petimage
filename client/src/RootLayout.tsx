import { Outlet, useLocation } from "react-router-dom"
import { MainContainer } from "./components/Containers"
import Footer from "./components/Footer"
import Header from "./components/Nav"
import ReactPlayer from "react-player/file";



export default function RootLayout() {
  const pathname = useLocation().pathname
  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
        <Footer />
        {(pathname === '/' || pathname === '/create') && <ReactPlayer className="bg" url="bg.mp4" width="100%" height="100%" playing={true} />}
      </MainContainer>
    </>
  )
}


