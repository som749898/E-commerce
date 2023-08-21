import { useContext, useState } from "react"
import { BsArrowLeft, BsFillBookmarkFill,BsFillHandbagFill,BsFillTagFill } from "react-icons/bs";
import {FaCarSide} from "react-icons/fa";
import {AiOutlineDown} from "react-icons/ai";

import { BookContext } from "../../Context/BookContext"
import { Header } from "../../Components/01. Header/Header"
import "./ProductList.css"
import { BookCard } from "../../Components/03. BookCard/BookCard";
import image from "../../Images/05. Introduction.png"
import { NavLink } from "react-router-dom";

export const ProductList = () => {
  const [authorEnd, setAuthorEnd] = useState(4);
  const [categoryEnd, setCategoryEnd] = useState(4);
  const loadMoreAuthor = () => {
    return authorEnd < allAuthor.length ? setAuthorEnd(prev => prev + 4) : setAuthorEnd(allAuthor.length)
  }
  const loadMoreCategory = () => {
    return categoryEnd < allCategory.length ? setCategoryEnd(prev => prev +4) : setCategoryEnd(allCategory.length)
  }
  const {state} = useContext(BookContext);
  const allCategory = [...new Set(state.data.map(item => item.category))];
  const allAuthor = [...new Set(state.data.map(item => item.author))];
  return <div>
    <Header/>
    <div className="offer">
      <div className="offer-left">
        <NavLink to="/" className="text-1">
          <BsArrowLeft className="arrow"/>
          <p className="arrow-text">Back to home</p>
        </NavLink>
        <div className="text-2">
          <div className="bookmark-bg">
            <BsFillBookmarkFill className="bookmark"/>
          </div>
          <div className="text-header">
            <p className="title">BookBazaar</p>
            <div className="offer-desc">
              <div className="desc">
                <BsFillHandbagFill className="offer-logo"/>
                <p className="desc-text">Min. &#8377;100</p> 
              </div>
              <div className="desc">
                <BsFillTagFill className="offer-logo tag"/>
                <p className="desc-text">&#8377;0.50</p>
              </div>
              <div className="desc">
                <FaCarSide className="offer-logo car"/>
                <p className="desc-text">20-30 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img className="offer-img" src={image} alt="offer" />
      </div>
    </div>
    {/* Product sorting */}
    <div className="product-sorting">
      <button className="reset">Reset</button>
      <select className="sort">
        <option>Sortby: Most Popular<AiOutlineDown/></option>
        <option>Sortby: Price</option>
        <option>Sortby: Rating</option>
      </select>
    </div>
    {/* Product listing */}
    <div className="product-listing">
      <div className="product-filter">
        <div className="price">
          <div className="price-text">Price range</div>
          <div className="range-text">
            <div className="range1">&#8377;0.00</div>
            <div className="range2">&#8377;0.00</div>
          </div>
          <input type="range" className="slider" min="0" max="100" />
        </div>
        <div className="filter">
          <div className="filter-text">Authors</div>
          <div>
            {
              allAuthor.slice(0,authorEnd).map(item => <div className="filter-content">
                <input type="radio" className="radio-style" />
                <div className="filter-name">{item}</div>
              </div>)
            }
          </div>
          {authorEnd >= allAuthor.length ? "" : <button className="filter-btn" onClick={loadMoreAuthor}>Load more</button>} 
        </div>
        <div className="filter">
          <div className="filter-text">Category</div>
          <div>
            {
              allCategory.slice(0,categoryEnd).map(item => <div className="filter-content">
                <input type="radio" className="radio-style" />
                <div className="filter-name">{item}</div>
              </div>)
            }
          </div>
          {categoryEnd >= allCategory.length ? "" : <button className="filter-btn" onClick={loadMoreCategory}>Load More</button>}
        </div>
        <div className="filter">
          <div className="filter-text">Product Rating</div>
          <div>
            <label className="filter-content">
              <input type="radio" className="radio-style" />
              <div className="filter-name">1 Stars & above</div>
            </label>
            <label className="filter-content">
              <input type="radio" className="radio-style" />
              <div className="filter-name">2 Stars & above</div>
            </label>
            <label className="filter-content">
              <input type="radio" className="radio-style" />
              <div className="filter-name">3 Stars & above</div>
            </label>
            <label className="filter-content">
              <input type="radio" className="radio-style" />
              <div className="filter-name">4 Stars & above</div>
            </label>
          </div>
        </div>
        <div className="filter">
          <div className="filter-text filter-sort">Sort By</div>
          <label className="filter-content">
            <input className="radio-style" type="radio" />
            <div className="filter-name">High to Low</div>
          </label>
          <label className="filter-content">
            <input className="radio-style" type="radio" />
            <div className="filter-name">Low to High</div>
          </label>
        </div>
      </div>
      <div className="product-list">
        {
          state.data.map(item => <BookCard item={item} />)
        }
      </div>
    </div>
  </div>
}