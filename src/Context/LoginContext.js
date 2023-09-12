import { createContext, useReducer } from "react";

export const LoginContext = createContext();

const reducerFunction = (state, action) => {
  switch(action.type) {
    case "LOGIN": return {...state, isLogin: true};
    case "LOGOUT": return {...state, isLogin: false};
    default: return state;
  }
}

export const LoginProvider = ({children}) => {
  const [loginState, loginDispatch] = useReducer(reducerFunction, {
    isLogin: false,
    name: "",
    email: "",
    username: "",
    password: ""
  })
  return <LoginContext.Provider value={{loginState, loginDispatch}}>
    {children}
  </LoginContext.Provider>
}