import { useContext, useState, useRef, useEffect } from "react"
import { BsArrowLeft, BsFillBookmarkFill,BsFillHandbagFill,BsFillTagFill } from "react-icons/bs";
import {FaCarSide} from "react-icons/fa";
import {AiOutlineDown} from "react-icons/ai";
import { RotatingLines } from  'react-loader-spinner'

import { BookContext } from "../../Context/BookContext"
import { PaginateContext } from "../../Context/PaginateContext";
import { Header } from "../../Components/01. Header/Header"
import { Footer } from "../../Components/02. Footer/Footer";
import "./ProductList.css"
import { BookCard } from "../../Components/03. BookCard/BookCard";
import image from "../../Images/05. Introduction.png"
import { NavLink, useParams } from "react-router-dom";

export const ProductList = () => {
  const [authorEnd, setAuthorEnd] = useState(4);
  const [categoryEnd, setCategoryEnd] = useState(4);
  const loadMoreAuthor = () => {
    return authorEnd < allAuthor.length ? setAuthorEnd(prev => prev + 4) : setAuthorEnd(allAuthor.length)
  }
  const loadMoreCategory = () => {
    return categoryEnd < allCategory.length ? setCategoryEnd(prev => prev +4) : setCategoryEnd(allCategory.length)
  }
  const {state, filterState,filterDispatch, searchDispatch,loading} = useContext(BookContext);
  const allCategory = [...new Set(state.data.map(item => item.category))];
  const allAuthor = [...new Set(state.data.map(item => item.author))];

  const {paginateState,paginateDispatch} = useContext(PaginateContext);

  const setActive = (item) => {
    return item === paginateState.currentPage ? "pg-active" : ""
  }

  const targetRef = useRef(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const btnReset = () => {
    filterDispatch({type: "RESET"});
    setAuthorEnd(4);
    setCategoryEnd(4);
    searchDispatch({type: "RESET"});
  }

  const {categorySelected} = useParams();

  useEffect(() => {
    categorySelected !== undefined && filterDispatch({type: "SELECTED_CATEGORY",payload: categorySelected });
    // eslint-disable-next-line
  },[categorySelected])

  return <div>
    <Header/>
    <div className="offer">
      <div className="offer-left">
        <NavLink to="/">
          <div className="text-1">
            <BsArrowLeft className="arrow"/>
            <p className="arrow-text">Back to home</p>
          </div>
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
      <button onClick={btnReset} className="reset">Reset</button>
      <select value={filterState.sort} onChange={(e) => filterDispatch({type: "SORT", payload: e.target.value})} className="sort">
        <option value="sortByPopular">Sortby: Most Popular<AiOutlineDown/></option>
        <option value="sortByPrice">Sortby: Price</option>
        <option value="sortbyRating">Sortby: Rating</option>
      </select>
    </div>
    {/* Product listing */}
    <div className="product-listing" ref={targetRef} id="target-section">
      <div className="product-filter">
        <div className="price">
          <div className="price-text">Price range</div>
          <div className="range-text">
            <div className="range1">${Math.round(filterState.minPrice) || 0}</div>
            <div className="range2">$15</div>
          </div>
          <input onChange={(e) => filterDispatch({type: "SET_RANGE", payload: e.target.value})} type="range" className="slider" min="0" max="100" />
        </div>
        <div className="filter">
          <div className="filter-text">Authors</div>
          <div>
            {
              allAuthor.slice(0,authorEnd).map(item => <div className="filter-content">
                <input onChange={() => filterDispatch({type: "FILTER_AUTHOR",payload: item}) } type="checkbox" className="radio-style" checked={filterState.author.includes(item)} />
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
                <input onChange={() => filterDispatch({type: "FILTER_CATEGORY", payload: item})} checked={filterState.category.includes(item)} type="checkbox" className="radio-style" />
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
              <input onChange={(e) => filterDispatch({type: "SET_RATING", payload: e.target.value})} value="1" checked={filterState.productRating === "1"} type="radio" className="radio-style" />
              <div className="filter-name">1 Stars & above</div>
            </label>
            <label className="filter-content">
              <input onChange={(e) => filterDispatch({type: "SET_RATING", payload: e.target.value})} value="2" checked={filterState.productRating === "2"} type="radio" className="radio-style" />
              <div className="filter-name">2 Stars & above</div>
            </label>
            <label className="filter-content">
              <input onChange={(e) => filterDispatch({type: "SET_RATING", payload: e.target.value})} value="3" checked={filterState.productRating === "3"} type="radio" className="radio-style" />
              <div className="filter-name">3 Stars & above</div>
            </label>
            <label className="filter-content">
              <input onChange={(e) => filterDispatch({type: "SET_RATING", payload: e.target.value})} value="4" checked={filterState.productRating === "4"} type="radio" className="radio-style" />
              <div className="filter-name">4 Stars & above</div>
            </label>
          </div>
        </div>
        <div className="filter">
          <div className="filter-text filter-sort">Sort By</div>
          <label className="filter-content">
            <input onChange={(e) => filterDispatch({type: "SORT_BY_PRICE", payload: e.target.value})} checked={filterState.sortPrice === "HighToLow"} value="HighToLow" className="radio-style" type="radio" />
            <div className="filter-name">High to Low</div>
          </label>
          <label className="filter-content">
            <input onChange={(e) => filterDispatch({type: "SORT_BY_PRICE", payload: e.target.value})} checked={filterState.sortPrice === "LowToHigh"} value="LowToHigh" className="radio-style" type="radio" />
            <div className="filter-name">Low to High</div>
          </label>
        </div>
      </div>
      <div className="product-list">
          { loading ?
          <div className="product-spinner">
            <div>
              <RotatingLines className="rotating-lines"
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
              />
            </div>
          </div>
            :
            paginateState.books.map(item => <BookCard item={item} />)
          }
        </div>
    </div>
    <div className="page-number">
      <button onClick={() => {paginateDispatch({type: "PREV"}); scrollToTarget();}}>Previous</button>
      {
        paginateState.pages.map(item => <div className={`single-pg ${setActive(item)}`} onClick={() =>{ paginateDispatch({type: "PAGINATE", payload: item}); scrollToTarget(); } }>{item}</div>)
      }
      <button onClick={() => {paginateDispatch({type: "NEXT"}); scrollToTarget();}}>Next</button>
    </div>
    <Footer/>
  </div>
}