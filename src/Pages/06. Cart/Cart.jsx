import { useContext, useState } from "react";
import Modal from 'react-modal';

import "./Cart.css"

import { BsFillTagFill } from "react-icons/bs";
import {MdCancel} from "react-icons/md";
import {FcCancel} from "react-icons/fc";
import { Header } from "../../Components/01. Header/Header"
import { Footer } from "../../Components/02. Footer/Footer";
import { BookContext } from "../../Context/BookContext";
import { EmptyCard } from "../../Components/04. EmptyCard/EmptyCard";
import { CartCard } from "../../Components/05. CartCard/CartCard";
import { NavLink } from "react-router-dom";

export const Cart = () => {
  const {state, dispatch} = useContext(BookContext);

  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const cancelModal = () => {
    setModalIsOpen(false);
    dispatch({type: "COUPON_CANCEL"})
  }
  console.log("state", state);

  const totalItem = state.cart.reduce(((acc,cur) => acc + cur.qty),0);
  const totalCost = Math.round(state.cart.reduce(((acc,cur) => acc + cur.qty * cur.price),0));
  const totalDiscount = Math.round(totalCost * 0.2);
  const totalCouponDiscount = (totalCost - totalDiscount) * Number(state.selectedCoupons.slice(0,2))/100;
  const totalAmount = (totalCost - totalDiscount) - totalCouponDiscount;
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
            state.cart.length !==0 ? state.cart.map(item => <CartCard item={item} />) : <EmptyCard text="Cart" />
          }
        </div>
      </div>
      <div className="cart-total">
        <div className="cart-coupon">
          <div className="cart-tag">
            <BsFillTagFill className="tag-icon"/>
            <div> Have A Coupon ?</div>
          </div>
          <button onClick={() => setModalIsOpen(true)} className="btn-apply">Apply</button>
        </div>
        <Modal className="cartModal" isOpen={modalIsOpen}>
          <div className="modal-header">
            <h3>Apply Coupon</h3>
            <MdCancel onClick={cancelModal} className="cross"/>
          </div>
          <div className="cart-coupons">
            {
              state.coupon.map(item => <div>
                <label>
                  <input checked={state.selectedCoupons === item} value={item} onChange={(e) => dispatch({type: "APPLY_COUPON", payload: e.target.value})} type="radio"/>
                  <p>{item}</p>
                </label>  
              </div>)
            }
          </div>
          <button onClick={() => setModalIsOpen(false)} className="btn-apply">Apply</button>
        </Modal>
        <br/>
        <hr/>
        <div className="cart-price">PRICE DETAILS</div>
        <hr/>
        <div className="cart-description">
          <div className="desc">
            <div>Price ({totalItem} item)</div>
            <div>${totalCost}</div>
          </div>
          <div className="desc">
            <div>Discount</div>
            <div>-${totalDiscount}</div>
          </div>
          <div className="desc">
            <div>Delivery Charges</div>
            <div>FREE</div>
          </div>
          <div className="desc">
            <div>Coupon Discount</div>
            <div>${state.selectedCoupons ? totalCouponDiscount : 0.00}</div>
          </div>

          {
            state.selectedCoupons !== "" ? <div className="coupon-delete">
              <div>{state.selectedCoupons.slice(8)}</div>
              <FcCancel onClick={cancelModal} className="cancel"/>
            </div> : ""
          }
          <br/>
          <hr/>
          <div className="desc total-amount">
            <div>Total Amount</div>
            <div>${totalAmount}</div>
          </div>
          <hr/>
          <br/>
        </div>
        <div className="save">You will save ${totalDiscount + totalCouponDiscount} on this order</div>
        <NavLink to="/checkout">
          <button className="cart-btn">Checkout</button>
        </NavLink>
      </div>
    </div>
    <Footer/>
  </div>
}