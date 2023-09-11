import { createContext, useReducer } from "react";
import { v4 as uuid } from "uuid";

export const AddressContext = createContext();

const reducerFunction = (state, action) => {
  switch(action.type) {
    case "NAME": return {...state, name: action.payload};
    case "HOUSE": return {...state, houseNo: action.payload};
    case "CITY": return {...state, city: action.payload};
    case "STATE": return {...state, state: action.payload};
    case "COUNTRY": return {...state, country: action.payload};
    case "POSTAL": return {...state, postalCode: action.payload};
    case "MOBILE": return {...state, mobileNo: action.payload};
    case "RESET": return {...state, name : "",
      houseNo: "",
      city: "",
      state: "",
      country: "",
      postalCode : "",
      mobileNo: ""
    };
    case "DUMMY_DATA": return {...state, 
      name : "Narendra Modi",
      houseNo: "Srusti Tower - 103, Bhoi nagar, near Maharaja Hall",
      city: "Bhubaneswar",
      state: "Odisha",
      country: "India",
      postalCode : "751021",
      mobileNo: "7418520963"
    };
    case "ADD": return {...state, address: [...state.address, {
      _id: uuid(), ...action.payload}],
      name : "",
      houseNo: "",
      city: "",
      state: "",
      country: "",
      postalCode : "",
      mobileNo: ""
    }
    case "CHANGE_ADDRESS": return {...state, currentAddress: state.address.find(ele => ele._id === action.payload)};
    case "EDIT": return {...state,
      id: action.payload._id,
      name : action.payload.name,
      houseNo: action.payload.houseNo,
      city: action.payload.city,
      state: action.payload.state,
      country: action.payload.country,
      postalCode : action.payload.postalCode,
      mobileNo: action.payload.mobileNo,
      isEdit: true
    }
    case "CORRECT": return {...state,
        address: state.address.map(item => item._id === state.id ? {_id: state.id, ...action.payload} : item),
        name : "",
        houseNo: "",
        city: "",
        state: "",
        country: "",
        postalCode : "",
        mobileNo: "",
        id: "",
        isEdit: false
    }
    case "DELETE": return {...state, address: state.address.filter(item => item._id !== action.payload._id)};
    default: return state;
  }
}

export const AddressProvider = ({children}) => {
  const [addressState, addressDispatch] = useReducer(reducerFunction, {
    address: [],
    currentAddress: {},
    id:"",
    name : "",
    houseNo: "",
    city: "",
    state: "",
    country: "",
    postalCode : "",
    mobileNo: "",
    isEdit: false
  })
  return <AddressContext.Provider value={{addressState, addressDispatch}}>
    {children}
  </AddressContext.Provider>
}