import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import toast, { Toaster } from 'react-hot-toast';

import {BsFillStarFill} from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { BookContext } from "../../Context/BookContext";
import { LoginContext } from "../../Context/LoginContext";

import "./BookCard.css"

export const BookCard = ({item}) => {
  const overlay = () => {
    return !item.inStock ? "top-overlay" : "";
  }
  
  const {state,dispatch} = useContext(BookContext);
  const {loginState} = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();

  const addToWishlist = async () => {
    const encodedToken = localStorage.getItem("token");
    const data = {
      "product": item
    }

    const fetchData = () => {
      return new Promise(async (resolve,reject) => {
        try {
          const addWishlistitem = await fetch("/api/user/wishlist", {
            method: "POST",
            headers: {
              "authorization": encodedToken,
            },
            body: JSON.stringify(data)
          }).then(res => res.json())
          dispatch({type: "ADD_WISHLIST", payload: addWishlistitem});
          resolve(addWishlistitem);
        }catch(error) {
          reject(error);
        }
      })
    }
    const myPromise = fetchData();
    toast.promise(myPromise, {
      loading: 'adding the item',
      success: 'Item has been successfully added to wishlist',
      error: 'Error when fetching or adding wishlist data',
    });
  }

  const deleteWishlist = async () => {
    const encodedToken = localStorage.getItem("token");

    const fetchData = () => {
      return new Promise( async (resolve,reject) => {
        try {
          const deleteWishListItem = await fetch(`/api/user/wishlist/${item._id}`, {
            method: "DELETE",
            headers: {
              "authorization": encodedToken,
            }
          }).then(res => res.json())
          dispatch({type: "ADD_WISHLIST", payload: deleteWishListItem});
          resolve(deleteWishListItem);
        } catch(error) {
          reject(error);
        }
      })
    }

    const myPromise = fetchData();
    toast.promise(myPromise, {
      loading: 'deleting the item',
      success: 'Item has been successfully deleted from wishlist',
      error: 'Error when fetching or deleting wishlist data',
    });
  }

  const activeWishlist = () => {
    return state.wishlist.find(wish => wish._id === item._id) ? "book-not-wishlist" : "book-wishlist"
  }

  const addToCart = async () => {
    const encodedToken = localStorage.getItem("token");
    const body = {
      "product": item
    }
    const fetchCartData = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const cart = await fetch('/api/user/cart', {
            method: 'POST',
            headers: {
              'authorization': encodedToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }).then(res => res.json());
    
          dispatch({ type: 'ADD_CART', payload: cart.cart });
          resolve(cart);
        } catch (error) {
          reject(error);
        }
      });
    };
    
    const myPromise = fetchCartData();
    
    toast.promise(myPromise, {
      loading: 'adding the item',
      success: 'Item has been successfully added to cart',
      error: 'Error when fetching or adding cart data',
    });
  }

  return <div className="book-card">
      <div className={`${overlay()}`}>
        <div>{item.bestseller ? <div className="bestseller-tag">Bestseller</div> : ""}</div>
        <AiFillHeart onClick={!loginState.isLogin ? () => navigate("/login", { state: { from: location } }) :  (state.wishlist.find(wish => wish._id === item._id) ? deleteWishlist : addToWishlist)} className={activeWishlist()}/>
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
      {
        state.cart.find(cart => cart._id === item._id) ? <NavLink to="/cart">
          <button className="book-btn">Go to Cart</button>
        </NavLink> :
        <div>
          <button onClick={!loginState.isLogin ? () => navigate("/login", { state: { from: location } }) : addToCart} className="book-btn">Add to Cart</button>
          <Toaster />
        </div>
      }
      {
      !item.inStock && <div className="outOfStock">Out of Stock</div>
      }
    </div>
}