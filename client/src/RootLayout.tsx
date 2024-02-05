import { Outlet, useLocation } from "react-router-dom"
import { MainContainer } from "./components/Containers"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ReactPlayer from "react-player/file";



export default function RootLayout() {
  const pathname = useLocation().pathname

  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
        {(pathname === '/' || pathname === '/create') && 
        <ReactPlayer
        poster={<img src="bg_capture.png" alt="bg" className="bg"/>}
        muted={true} playing={true} loop={true} className="bg" url="bg.mp4" width="100%" height="100%" 
        />}
        <Footer />
      </MainContainer>
    </>
  )
}


