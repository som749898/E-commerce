import { createContext, useEffect, useReducer } from "react";

export const BookContext = createContext();

const reducerFunction = (state, action) => {
  switch(action.type) {
    case "LOAD_DATA": return {...state,data: action.payload.product, cart: action.payload.cart,
      wishlist: action.payload.wishlist
    }
    case "ADD_WISHLIST": return {...state, wishlist: action.payload.wishlist}
    case "ADD_CART": return {...state, cart: action.payload}
    default: return state;
  }
}

const filterFunction = (state, action) => {
  switch(action.type) {
    case "FILTER_AUTHOR": return {...state, author: state.author.includes(action.payload) ? state.author.filter(eachAuthor => eachAuthor !== action.payload ) : [...state.author, action.payload]}
    case "FILTER_CATEGORY": return {...state, category: state.category.includes(action.payload) ? state.category.filter(eachCategory => eachCategory !== action.payload) : [...state.category, action.payload]}
    case "SELECTED_CATEGORY": return {...state, category: state.category.includes(action.payload) ? [...state.category] : [...state.category, action.payload]};
    case "SET_RATING": return {...state, productRating: action.payload}
    case "SET_RANGE": return {...state, priceRange: action.payload}
    case "FILTERED_DATA": return {...state, data: action.payload}
    case "LOAD_DATA": return {...state, data: action.payload}
    case "SORT_BY_PRICE": return {...state, sortPrice: action.payload, sort:""}
    case "SET_MIN_PRICE": return {...state, minPrice: action.payload}
    case "RESET": return {...state,author: [],
      category: [],
      productRating: "",
      priceRange: "",
      data: [],
      sortPrice: "",
      minPrice: 0,
      sort:"" }
    case "SORT": return {...state, sortPrice: "", sort: action.payload}
    default: return state
  }
}

const searchFunction = (state, action) => {
  switch(action.type) {
    case "TEXT": return {...state, searchText: action.payload}
    case "LOAD_DATA": return {...state, searchData: action.payload}
    case "SET_DATA": return {...state, searchData: action.payload};
    case "RESET": return {...state,searchText: "",searchData: [] };
    default: return state
  }
}

export const BookProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducerFunction, {
    data: [],
    wishlist: [],
    cart: [],
    coupon: ["50% OFF:REPUBLIC_SALE", "10% OFF:NEW_USER"]
  })

  const [filterState, filterDispatch] = useReducer(filterFunction, {
    author: [],
    category: [],
    productRating: "",
    priceRange: "",
    data: [],
    sortPrice: "",
    minPrice: 0,
    sort: ""
  })

  const [searchState, searchDispatch] = useReducer(searchFunction, {
    searchText: "",
    searchData: []
  })

  const getProduct = async () => {
    try {
      const encodedToken = localStorage.getItem("token");
      const allProduct = await fetch("/api/products").then(res => res.json());
      const allCart = await fetch("/api/user/cart",{
        method: "GET",
        headers: {
          "authorization": encodedToken,
        },
      }).then(res => res.json());
      const allWishlist = await fetch("/api/user/wishlist", {
        method: "GET",
        headers: {
          "authorization": encodedToken,
        },
      }).then(res => res.json())
      dispatch({type: "LOAD_DATA", payload: {product: allProduct.products, cart: allCart.cart, wishlist: allWishlist.wishlist  }})
      filterDispatch({type: "LOAD_DATA", payload: allProduct.products});
      searchDispatch({type: "LOAD_DATA", payload: allProduct.products});
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getProduct();
  },[])

  useEffect(() => {
    let filterData = state.data;

    // set the range
    const prices = state.data.map(item => item.price);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const range = maxPrice-minPrice;
    const minPriceRange = (Number(filterState.priceRange) * range)/100 + minPrice;
    filterDispatch({type: "SET_MIN_PRICE", payload: minPriceRange});
    filterData = filterData.filter(item => item.price >= minPriceRange && item.price <= maxPrice);
    
    // filter author
    filterData = filterState.author.length !==0 ? filterData.filter(item => filterState.author.includes(item.author)) : filterData;

    // filter category
    filterData = filterState.category.length !== 0 ? filterData.filter(item => filterState.category.includes(item.category)) : filterData;

    // sort rating
    filterData = filterState.productRating ? filterData.filter(item => item.ratings > Number(filterState.productRating)) : filterData;

    // sort by price
    filterData = filterState.sortPrice ? filterState.sortPrice === "LowToHigh" ? filterData.sort((a,b) => a.price - b.price) : filterData.sort((a,b) => b.price - a.price) : filterData;

    // sort
    switch(filterState.sort) {
      case "sortByPopular" : filterData = filterData.sort((a,b) => a.title - b.title);
      break;
      case "sortByPrice": filterData = filterData.sort((a,b) => a.price - b.price);
      break;
      case "sortbyRating": filterData = filterData.sort((a,b) => b.ratings - a.ratings);
      break;
      // eslint-disable-next-line
      default: filterData = filterData;
      break;
    }

    filterDispatch({type: "FILTERED_DATA", payload: filterData});
    // eslint-disable-next-line
  }, [filterState.productRating, filterState.author, filterState.category, filterState.priceRange, filterState.sortPrice, filterState.sort])

  useEffect(() => {
    let data = filterState.data;
    data = searchState.searchText ? data.filter(item => item.title.toLowerCase().includes(searchState.searchText.toLowerCase()) || item.author.toLowerCase().includes(searchState.searchText.toLowerCase())) : data;
    searchDispatch({type: "SET_DATA", payload: data});
    // eslint-disable-next-line
  },[filterState.data ,searchState.searchText]);
  return <BookContext.Provider value={{state,dispatch, filterState,filterDispatch,searchState, searchDispatch}}>
    {children}
  </BookContext.Provider>
}