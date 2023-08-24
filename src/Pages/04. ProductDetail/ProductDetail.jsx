import { useParams } from "react-router-dom"
import { useContext } from "react"
import { AiFillStar, AiFillThunderbolt } from "react-icons/ai";
import { BsFillTagFill } from "react-icons/bs";

import "./ProductDetail.css"
import { BookContext } from "../../Context/BookContext"

import { Header } from "../../Components/01. Header/Header"

export const ProductDetail = () => {
  const {id} = useParams();
  const {state} = useContext(BookContext);
  const selectedProduct = state.data.find(item => item._id.toString() === id);
  console.log("book", selectedProduct);
  return <div>
    <Header/>
    <div className="book-center">
      <div className="book-detail">
        <div className="book-left">
          <img className="book-img" src={selectedProduct.coverImage} alt="book" />
        </div>
        <div className="book-content">
          <h1>{selectedProduct.title}</h1>
          <div className="book-info">
            <div className="book-rating">
              <div>{selectedProduct.ratings}</div>
              <AiFillStar className="rating-icon"/>
            </div>
            <div>Reviews: {selectedProduct.review}</div>
          </div>
          <p className="book-price">${selectedProduct.price}</p>
          <div className="book-stock">
            <AiFillThunderbolt className="thunder-logo"/>
            <div>Hurry , Only Few Left !</div>
          </div>
          <div className="book-tags">
            <div className="book-tag">
              <BsFillTagFill className="tag-icon"/>
              <p>Fastest Delivery</p>
            </div>
            <div className="book-tag">
              <BsFillTagFill className="tag-icon"/>
              <p>Inclusive of All Taxes</p>
            </div>
            <div className="book-tag">
              <BsFillTagFill className="tag-icon"/>
              <p>Cash On Delivery Available</p>
            </div>
          </div>
          <div className="book-desc">
            <div>
              <span className="book-grey">Author: </span>
              <span className="book-blue">{selectedProduct.author}</span>
            </div>
            <div>
              <span className="book-grey">Category: </span>
              <span className="book-blue">{selectedProduct.category}</span>
            </div>
            <div>
              <span className="book-grey">Pages: </span>
              <span className="book-blue">{selectedProduct.pages}</span>
            </div>
            <div>
              <span className="book-grey">Publisher: </span>
              <span className="book-blue">{selectedProduct.publisher}</span>
            </div>
          </div>
          <button className="book-cart">Add to Cart</button>
          <button className="book-wishlist">Add to Wishlist</button>
        </div>
    </div>
    </div>
  </div>
}