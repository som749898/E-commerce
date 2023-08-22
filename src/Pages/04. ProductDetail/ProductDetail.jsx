import { useParams } from "react-router-dom"
import { useContext } from "react"

import "./ProductDetail.css"
import { BookContext } from "../../Context/BookContext"

export const ProductDetail = () => {
  const {id} = useParams();
  const {state} = useContext(BookContext);
  const selectedProduct = state.data.find(item => item._id.toString() === id);
  console.log("book", selectedProduct);
  return <div>{selectedProduct.toString()}</div>
}