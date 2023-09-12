import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { LoginContext } from "../../Context/LoginContext";

export const RequireAuth = ({children}) => {
  const {loginState} = useContext(LoginContext);
  const location = useLocation();
  return loginState.isLogin ? children : <Navigate to="/login" state={{from: location}} />
}