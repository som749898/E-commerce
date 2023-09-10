import "./CartCard.css";
import { BookContext } from "../../Context/BookContext";

import { AiFillHeart } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useContext } from "react";
import toast, { Toaster } from 'react-hot-toast';

export const CartCard = ({item}) => {
  const {state,dispatch} = useContext(BookContext);
  const deleteItem = async () => {
    const encodedToken = localStorage.getItem("token");

    const fetchData = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await fetch(`/api/user/cart/${item._id}`, {
            method: "DELETE",
            headers: {
              "authorization": encodedToken
            }
          }).then(res => res.json());
          dispatch({type: "ADD_CART", payload: result.cart});
          resolve(result);
        }catch(error) {
          reject(error);
        }
      })
    }
    const myPromise = fetchData();
    toast.promise(myPromise, {
      loading: 'deleting the item',
      success: 'Item has been successfully deleted from cart',
      error: 'Error when fetching or deleting cart data',
    });
  }

  const itemMinus = async () => {
    const encodedToken = localStorage.getItem("token");
    const data = {
      action: {
        type: "decrement"
      }
    }
    if(item.qty <= 1) {
      const fetchData = () => {
        return new Promise(async (resolve, reject) => {
          try {
            const result = await fetch(`/api/user/cart/${item._id}`, {
              method: "DELETE",
              headers: {
                "authorization": encodedToken
              }
            }).then(res => res.json());
            dispatch({type: "ADD_CART", payload: result.cart});
            resolve(result);
          }catch(error) {
            reject(error);
          }
        })
      }
      const myPromise = fetchData();
      toast.promise(myPromise, {
        loading: 'deleting the item',
        success: 'Item has been successfully deleted from cart',
        error: 'Error when fetching or deleting cart data',
      });
    } else {
      const fetchData = () => {
        return new Promise(async (resolve, reject) => {
          try {
            const result = await fetch(`/api/user/cart/${item._id}`, {
              method: "POST",
              headers: {
                "authorization": encodedToken
              },
              body: JSON.stringify(data)
            }).then(res => res.json());
            dispatch({type: "ADD_CART", payload: result.cart});
            resolve(result);
          }catch(error) {
            reject(error);
          }
        })
      }
      const myPromise = fetchData();
      toast.promise(myPromise, {
        loading: 'deleting the item',
        success: 'Quantity of item has been decreased by 1 unit',
        error: 'Error when fetching or deleting cart data',
      });
    }
  }

  const itemPlus = async () => {
    const encodedToken = localStorage.getItem("token");
    const data = {
      action: {
        type: "increment"
      }
    }
    const fetchData = () => {
      return new Promise(async (resolve,reject) => {
        try {
          const result = await fetch(`/api/user/cart/${item._id}`, {
            method: "POST",
            headers: {
              "authorization": encodedToken
            },
            body: JSON.stringify(data)
          }).then(res => res.json());
          dispatch({type: "ADD_CART", payload: result.cart});
          resolve(result);
        }catch(error) {
          reject(error);
        }
      })
    }
    const myPromise = fetchData();
    toast.promise(myPromise, {
      loading: 'increasing the quantity',
      success: 'Quantity of item has been increased by 1 unit',
      error: 'Error when fetching or deleting cart data',
    });
  }

  const activeWishlist = () => {
    return state.wishlist.find(wish => wish._id === item._id) ? "book-not-wishlist" : "book-wishlist"
  }

  const addToWishlist = async () => {
    const encodedToken = localStorage.getItem("token");
    const data = {
      "product": item
    }
    const fetchData = () => {
      return new Promise (async (resolve,reject) => {
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
      return new Promise(async (resolve,reject) => {
        try {
          const deleteWishListItem = await fetch(`/api/user/wishlist/${item._id}`, {
            method: "DELETE",
            headers: {
              "authorization": encodedToken,
            }
          }).then(res => res.json())
          dispatch({type: "ADD_WISHLIST", payload: deleteWishListItem});
          resolve(deleteWishListItem);
        }catch(error) {
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

  return <div className="cart-container">
    <div className="cart-left">
      <div className="cart-container-img">
        <img className="cart-img" src={item.coverImage} alt="book" />
        <AiFillHeart onClick={state.wishlist.find(wish => wish._id === item._id) ? deleteWishlist : addToWishlist} className={activeWishlist()}/>
      </div>
      <div className="cart-details">
        <div className="cart-title">{item.title}</div>
        <div className="cart-author">{item.author}</div>
      </div>
    </div>
    <div className="cart-right">
      <div className="cart-quantity">
        <div onClick={itemMinus} className="minus">-</div>
        <div className="number">{item.qty}</div>
        <div onClick={itemPlus} className="plus">+</div>
      </div>
      <div className="cart-delete">
        <div className="cart-price">${item.price}</div>
      </div>
      <AiFillDelete onClick={deleteItem} className="delete-icon"/>
    </div>
    <Toaster/>
  </div>
}