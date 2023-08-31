import { useContext } from "react"
import { NavLink } from "react-router-dom"

import { BookContext } from "../../Context/BookContext"
import "./HomePage.css"
import { Header } from "../../Components/01. Header/Header"
import { Footer } from "../../Components/02. Footer/Footer"

import coverImage from "../../Images/02. coverImage.jpeg"
import {BookImage} from "../../Utility/CategoryImage";

export const HomePage = () => {
  const {state} = useContext(BookContext);
  const allCategory = [...new Set(state.data.map(item => item.category))];
  return <div>
    <Header/>
    <div className="cover-container">
      <img alt="coverImage" src={coverImage} className="cover-image" />
      <div className="overlay">
        <h1>For All Your</h1>
        <h1>Reading Needs</h1>
        <NavLink to="/products">
          <button>SHOP NOW</button>
        </NavLink>
      </div>
    </div>
    <div className="category">
      <h1>Featured Book Categories</h1>
      <p>There are many categories of books available at BookBazaar. Choose your favorite one now.</p>
      <div className="homepage-category">
        {
          allCategory.map((item,index) => <NavLink to={`/products/${item}`}><div className="image-container">
            <img src={BookImage[index]} alt="categoryImage" />
            <div className="overlay">{item}</div>
          </div></NavLink>)
        }
      </div>
    </div>
    <Footer/>
  </div>
}