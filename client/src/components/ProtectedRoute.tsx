import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../util/useAuth";


//TODO : 리다이렉트 로직 고민해보기
export default function ProtectedRoute ({children}: {children: React.ReactNode}) {
  const auth = useAuth()
  const isAuthenticated = auth.isAuthenticated

  if(!isAuthenticated) {
    alert('로그인을 진행해주세요.')
    return <Navigate to="/login" />
  }
  if(children) return <Outlet />
}

