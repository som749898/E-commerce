import { createContext, useReducer } from "react";
import { v4 as uuid } from "uuid";

export const OrderContext = createContext();

const reducerFunction = (state, action) => {
  switch(action.type) {
    case "ADD": return {...state, order: [...state.order, {orderId: uuid(), paymentId: action.payload2, orderCart: action.payload1, amount: action.payload3, address: action.payload4}]}
    default: return state;
  }
}

export const OrderProvider = ({children}) => {
  const [orderState, orderDispatch] = useReducer(reducerFunction, {
    order: []
  })
  return <OrderContext.Provider value={{orderState,orderDispatch}}>
    {children}
  </OrderContext.Provider>
}