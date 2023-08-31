import { useContext } from "react";

import "./Cart.css"

import { BsFillTagFill } from "react-icons/bs";
import { Header } from "../../Components/01. Header/Header"
import { Footer } from "../../Components/02. Footer/Footer";
import { BookContext } from "../../Context/BookContext";
import { EmptyCard } from "../../Components/04. EmptyCard/EmptyCard";

export const Cart = () => {
  const {state} = useContext(BookContext);
  return <div>
    <Header/>
    <h1 className="cart-header">Shopping Cart</h1>
    <div className="cart-contain">
      <div className="cart-detail">
        <div className="cart-heading">
          <h3 className="product">Product</h3>
          <h3 className="quantity">Quantity</h3>
          <h3 className="price">Price</h3>
        </div>
        <div className="cart-card">
          {
            state.cart.length !==0 ? "" : <EmptyCard text="Cart" />
          }
        </div>
      </div>
      <div className="cart-total">
        <div className="cart-coupon">
          <div className="cart-tag">
            <BsFillTagFill className="tag-icon"/>
            <div> Have A Coupon ?</div>
          </div>
          <button className="btn-apply">Apply</button>
        </div>
        <br/>
        <hr/>
        <div className="cart-price">PRICE DETAILS</div>
        <hr/>
        <div className="cart-description">
          <div className="desc">
            <div>Price (1 item)</div>
            <div>$50</div>
          </div>
          <div className="desc">
            <div>Discount</div>
            <div>-$5</div>
          </div>
          <div className="desc">
            <div>Delivery Charges</div>
            <div>FREE</div>
          </div>
          <div className="desc">
            <div>Coupon Discount</div>
            <div>$0.00</div>
          </div>
          <br/>
          <hr/>
          <div className="desc total-amount">
            <div>Total Amount</div>
            <div>$45</div>
          </div>
          <hr/>
          <br/>
        </div>
        <div className="save">You will save $5 on this order</div>
        <button className="cart-btn">Checkout</button>
      </div>
    </div>
    <Footer/>
  </div>
}