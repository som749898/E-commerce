import "./CartCard.css";
import { BookContext } from "../../Context/BookContext";

import { AiFillDelete } from "react-icons/ai";
import { useContext } from "react";

export const CartCard = ({item}) => {
  const {dispatch} = useContext(BookContext);
  const deleteItem = async () => {
    const encodedToken = localStorage.getItem("token");
    const result = await fetch(`/api/user/cart/${item._id}`, {
      method: "DELETE",
      headers: {
        "authorization": encodedToken
      }
    }).then(res => res.json());
    dispatch({type: "ADD_CART", payload: result.cart});
  }

  const itemMinus = async () => {
    const encodedToken = localStorage.getItem("token");
    const data = {
      action: {
        type: "decrement"
      }
    }
    
    if(item.qty <= 1) {
      const result = await fetch(`/api/user/cart/${item._id}`, {
        method: "DELETE",
        headers: {
          "authorization": encodedToken
        }
      }).then(res => res.json());
      dispatch({type: "ADD_CART", payload: result.cart});
    } else {
      const result = await fetch(`/api/user/cart/${item._id}`, {
        method: "POST",
        headers: {
          "authorization": encodedToken
        },
        body: JSON.stringify(data)
      }).then(res => res.json());
      dispatch({type: "ADD_CART", payload: result.cart});
    }
  }

  const itemPlus = async () => {
    const encodedToken = localStorage.getItem("token");
    const data = {
      action: {
        type: "increment"
      }
    }
    const result = await fetch(`/api/user/cart/${item._id}`, {
      method: "POST",
      headers: {
        "authorization": encodedToken
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
    dispatch({type: "ADD_CART", payload: result.cart});
  }

  return <div className="cart-container">
    <div className="cart-left">
      <img className="cart-img" src={item.coverImage} alt="book" />
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
  </div>
}