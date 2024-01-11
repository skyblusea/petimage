import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";


export const useAuthContext = () => {
  const { user, token, isAuthenticated } = useContext(AuthContext)
  console.log("useAuthContext", user);
  return { user, token, isAuthenticated }
}