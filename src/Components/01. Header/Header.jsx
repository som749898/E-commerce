import { FaShoppingCart} from "react-icons/fa";
import { BsFillPersonFill,BsFillHandbagFill,BsSearch } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BookContext } from "../../Context/BookContext";

import { NavLink } from "react-router-dom";
import { useContext } from "react";

import "./Header.css"

export const Header = () => {
  const {state, searchState, searchDispatch} = useContext(BookContext);
  return <div>
    <header className="homepage-header">
      <NavLink to="/" className="header-title">
        <BsFillHandbagFill className="bag-icon"/><h1>BookBazaar</h1>
      </NavLink>
      <div className="header-search">
        <BsSearch className="search-icon"/>
        <input value={searchState.searchText} onChange={(e) => searchDispatch({type: "TEXT", payload: e.target.value})} type="text" placeholder="Search for books" />
      </div>
      <div className="header-icon">
        <NavLink to="/wishlist">
          <div className="wishlist-icon">
            <AiOutlineHeart className="wishlist" />
            {
              state.wishlist.length > 0 ? <div className="number">{state.wishlist.length}</div> : ""
            }
          </div>
        </NavLink>
        <NavLink to="/cart">
          <div className="cart-icon">
            <FaShoppingCart className="cart" />
            {
              state.cart.length > 0 ? <div className="number">{state.cart.length}</div> : ""
            }
          </div>
        </NavLink>
        <NavLink to="/profile">
          <BsFillPersonFill className="profile"/>
        </NavLink>
      </div>
    </header>
  </div>
}