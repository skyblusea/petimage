import { Outlet, useLocation } from "react-router-dom"
import { MainContainer } from "./components/Containers"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ReactPlayer from "react-player/file";
import useAuth from "./util/useAuth";
import LoginModal from "./components/LoginModal";



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


