import { NavLink } from "react-router-dom";

import {BsFillStarFill} from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

import "./BookCard.css"

export const BookCard = ({item}) => {
  const overlay = () => {
    return !item.inStock ? "top-overlay" : "";
  }
  return <div className="book-card">
      <div className={`${overlay()}`}>
        <div>{item.bestseller ? <div className="bestseller-tag">Bestseller</div> : ""}</div>
        <AiFillHeart className="book-wishlist"/>
      </div>
      <NavLink to={`/book/${item._id}`}>
        <img src={item.coverImage} alt="coverImage" />
      <div className="book-title">{item.title}</div>
      <div className="book-show">
        <div className="book-price">${item.price}<span className="grey-color">/pc</span></div>
        <div className="book-rating">
          <div className="rating">{item.ratings}</div>
          <BsFillStarFill className="star"/>
        </div>
      </div>
      </NavLink>
      <button className="book-btn">Add to Cart</button>
      {
      !item.inStock && <div className="outOfStock">Out of Stock</div>
      }
    </div>
}