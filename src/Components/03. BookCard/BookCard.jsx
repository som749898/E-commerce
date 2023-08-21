import { NavLink } from "react-router-dom";

import {BsFillStarFill} from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

import "./BookCard.css"

export const BookCard = ({item}) => {
  return <NavLink to={`/book/${item._id}`} className="book-card">
      <img src={item.coverImage} alt="coverImage" />
      <div className="top-overlay">
        {item.bestseller ? <div className="bestseller-tag">Bestseller</div> : ""}
        <AiFillHeart className="book-wishlist"/>
      </div>
      <div className="book-title">{item.title}</div>
      <div className="book-show">
        <div className="book-price">${item.price}<span className="grey-color">/pc</span></div>
        <div className="book-rating">
          <div className="rating">{item.ratings}</div>
          <BsFillStarFill className="star"/>
        </div>
      </div>
      <button className="book-btn">Add to Cart</button>
      {
      !item.inStock && <div className="outOfStock">Out of Stock</div>
      }
    </NavLink>
}