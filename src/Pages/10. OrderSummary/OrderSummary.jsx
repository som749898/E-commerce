import { useContext } from "react";

import "./OrderSummary.css";
import {Header} from "../../Components/01. Header/Header";
import { Footer } from "../../Components/02. Footer/Footer";
import { OrderContext } from "../../Context/OrderContext";

export const OrderSummary = () => {
  const {orderState} = useContext(OrderContext);
  const recentOrder = orderState.order[orderState.order.length-1];
  console.log("recent order", orderState);
  const date = new Date();
  return <div>
    <Header/>
    <div className="summary">
      <div className="profile-header">Order Summary</div>
      <div className="success">Congrats! Order has been successfully placed</div>
      <div className="summary-details">
        <div className="order-id"><span className="order-title">OrderID</span> - <span>{recentOrder.orderId}</span></div>
        <div><span className="order-title">PaymentID</span> - <span className="order-desc">{`pay_${recentOrder.paymentId}`}</span></div>
        <div><span className="order-title">Order Date</span> - <span className="order-desc">{date.toDateString()}</span></div>
        <div><span className="order-title">Total amount</span> - <span className="order-desc">${recentOrder.amount}</span></div>
        <div className="address"><div className="delivery">Delivery Address </div><div className="address-detail">{`- ${recentOrder.address.name}, ${recentOrder.address.houseNo}, ${recentOrder.address.city}, ${recentOrder.address.postalCode}`}</div></div>
        <div><span className="order-title">Phone Number</span> - <span className="order-desc">{recentOrder.address.mobileNo}</span></div>
      </div>
      <div>
        <div className="cart-card order-card">
            {
              recentOrder.orderCart.map(item => <div className="cart-container order-container">
              <div className="cart-left">
                <div className="cart-container-img">
                  <img className="cart-img" src={item.coverImage} alt="book" />
                </div>
              </div>
              <div className="cart-right order-detail">
                <div className="order-top">
                  <div className="cart-title">{item.title}</div>
                  <div className="cart-author">{item.author}</div>
                </div>
                <div className="order-middle">
                  <div>Qty: {item.qty}</div>
                </div>
                <div className="order-bottom">
                  <div>Price: ${item.price}/pc</div>
                </div>
              </div>
            </div>)
            }
        </div>
      </div>
    </div>
    <Footer/>
  </div>
}