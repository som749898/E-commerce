import "./HomePage.css"
import { Header } from "../../Components/01. Header/Header"

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
    {/* <h1 onClick={getProduct}>Home Page</h1> */}
    <Header/>
  </div>
}