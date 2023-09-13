import { createContext, useReducer } from "react";

export const LoginContext = createContext();

const reducerFunction = (state, action) => {
  switch(action.type) {
    case "LOGIN": return {...state, isLogin: true};
    case "LOGOUT": return {...state, isLogin: false};
    case "EMAIL": return {...state, email: action.payload};
    case "PASSWORD": return {...state, password: action.payload};
    case "FIRST_NAME": return {...state,firstName: action.payload};
    case "LAST_NAME": return {...state, lastName: action.payload};
    case "RESET": return {...state, 
      firstName: "",
      email: "",
      lastName: "",
      password: ""
    }
    case "TEST": return {...state, email: action.payload.email, password: action.payload.password};
    default: return state;
  }
}

export const LoginProvider = ({children}) => {
  const [loginState, loginDispatch] = useReducer(reducerFunction, {
    isLogin: false,
    firstName: "",
    email: "",
    lastName: "",
    password: ""
  })
  return <LoginContext.Provider value={{loginState, loginDispatch}}>
    {children}
  </LoginContext.Provider>
}