import { Outlet } from "react-router-dom"
import { Container } from "./components/Container"
import Footer from "./components/Footer"
import Header from "./components/Nav"



export default function Root() {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
        <Footer />
      </Container>
    </div>
  )
}