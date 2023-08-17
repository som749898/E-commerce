import { createContext, useEffect, useReducer } from "react";

export const BookContext = createContext();

const reducerFunction = (state, action) => {
  switch(action.type) {
    case "LOAD_DATA": return {...state,data: action.payload}
    default: return state;
  }
}

export const BookProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducerFunction, {
    data: []
  })

  const getProduct = async () => {
    try {
      const allProduct = await fetch("/api/products").then(res => res.json())
      dispatch({type: "LOAD_DATA", payload: allProduct.products})
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getProduct()
  },[])

  return <BookContext.Provider value={{state,dispatch}}>
    {children}
  </BookContext.Provider>
}