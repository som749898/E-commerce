import { useContext } from "react"

import "./Order.css"
import { OrderContext } from "../../Context/OrderContext"

export const Order = () => {
  const {orderState} = useContext(OrderContext);
  console.log(orderState);
  return <div>
    <div className="profile-header">Order Details</div>
    {
      orderState.order.map(item => <div className="summary profile-order">
      <div className="summary-details">
        <div className="order-id"><span className="order-title">OrderID</span> - <span>{item.orderId}</span></div>
        <div><span className="order-title">PaymentID</span> - <span className="order-desc">{`pay_${item.paymentId}`}</span></div>
        <div><span className="order-title">Total amount</span> - <span className="order-desc">${item.amount}</span></div>
        <div className="address"><div className="delivery">Delivery Address </div><div className="address-detail">{`- ${item.address.name}, ${item.address.houseNo}, ${item.address.city}, ${item.address.postalCode}`}</div></div>
        <div><span className="order-title">Phone Number</span> - <span className="order-desc">{item.address.mobileNo}</span></div>
      </div>
      <div>
        <div className="">
            {
              item.orderCart.map(item => <div className="profile-cart">
              <div className="">
                <div className="">
                  <img className="order-img" src={item.coverImage} alt="book" />
                </div>
              </div>
              <div className="">
                <div>
                  <div className="cart-title">{item.title}</div>
                  <div className="cart-author">{item.author}</div>
                </div>
                <div className="order-middle">
                  <div>Qty: {item.qty}</div>
                </div>
              </div>
            </div>)
            }
        </div>
      </div>
    </div>)
    }
  </div>
}