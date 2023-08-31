import { createContext, useContext, useEffect, useReducer } from "react";

import { BookContext } from "./BookContext";

export const PaginateContext = createContext();

const reducerFunction = (state, action) => {
  switch(action.type) {
    case "NEXT" : return state.currentPage < state.pages.length ? {...state, currentPage: state.currentPage +1} : {...state}; 
    case "PREV" : return state.currentPage > 1 ? {...state, currentPage: state.currentPage-1} : {...state}; 
    case "SELECTED_BOOKS": return {
      ...state, books: action.payload.selectedBooks,
      pages: action.payload.pages
    }
    case "PAGINATE": return {...state, currentPage: action.payload}
    case "FIRST_PAGE": return {...state, currentPage: 1};
    default: return state
  }
}

export const PaginateProvider = ({children}) => {
  const { searchState} = useContext(BookContext);
  const [paginateState, paginateDispatch] = useReducer(reducerFunction, {
    currentPage: 1,
    pagePerPost: 8,
    books: [],
    pages: []
  });

  useEffect(() => {
    const lastBookIndex = paginateState.currentPage * paginateState.pagePerPost;
    const firstBookIndex = lastBookIndex - paginateState.pagePerPost;
    const selectedBooks = searchState.searchData.slice(firstBookIndex,lastBookIndex);
    const pages = [];
    for(let i = 0; searchState.searchData.length > (paginateState.pagePerPost * i); i++) {
      pages.push(i+1);
    }
    
    paginateDispatch({type: "SELECTED_BOOKS", payload: {selectedBooks,pages}});
  },[paginateState.currentPage,searchState.searchData, paginateState.pagePerPost])

  useEffect(() => {
    paginateDispatch({type: "FIRST_PAGE"});
  },[searchState])

  return <PaginateContext.Provider value={{paginateState,paginateDispatch}}>
      {children}
    </PaginateContext.Provider>
}