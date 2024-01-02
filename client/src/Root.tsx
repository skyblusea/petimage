import { Outlet } from "react-router-dom"
import { MainContainer } from "./components/Containers"
import Footer from "./components/Footer"
import Header from "./components/Nav"



export default function Root() {
  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
        <Footer />
      </MainContainer>
    </>
  )
}