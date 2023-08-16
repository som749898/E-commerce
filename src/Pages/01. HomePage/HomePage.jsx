import { FaHeart,FaShoppingCart} from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

import "./HomePage.css"

export const HomePage = () => {
  const getProduct = async () => {
    try {
      const allProduct = await fetch("/api/products").then(res => res.json())
      console.log("product", allProduct.products);
    } catch(e) {
      console.log(e);
    }
  }
  return <div>
    <h1 onClick={getProduct}>Home Page</h1>
    <header>
      <h1>BookBazaar</h1>
      <input type="text" placeholder="Search for books" />
      <div>
      <FaHeart />
      <FaShoppingCart/>
      <BsFillPersonFill/>
      </div>
    </header>
  </div>
}