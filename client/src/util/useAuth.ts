import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


function useAuth() {
 return useContext(AuthContext);
}

export default useAuth;