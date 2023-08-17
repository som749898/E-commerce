import { FaShoppingCart} from "react-icons/fa";
import { BsFillPersonFill,BsFillHandbagFill,BsSearch } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { NavLink } from "react-router-dom";

import "./Header.css"

export const Header = () => {
  return <div>
    <header className="homepage-header">
      <NavLink to="/" className="header-title">
        <BsFillHandbagFill className="bag-icon"/><h1>BookBazaar</h1>
      </NavLink>
      <div className="header-search">
        <BsSearch className="search-icon"/>
        <input type="text" placeholder="Search for books" />
      </div>
      <div className="header-icon">
        <NavLink to="/wishlist">
          <AiOutlineHeart className="wishlist" />
        </NavLink>
        <NavLink to="/cart">
          <FaShoppingCart className="cart" />
        </NavLink>
        <NavLink to="/profile">
          <BsFillPersonFill className="profile"/>
        </NavLink>
      </div>
    </header>
  </div>
}