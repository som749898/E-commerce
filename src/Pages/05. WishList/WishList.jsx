import { useContext } from "react";

import "./WishList.css";
import { BookContext } from "../../Context/BookContext";
import { Header } from "../../Components/01. Header/Header";
import {Footer} from "../../Components/02. Footer/Footer";
import { BookCard } from "../../Components/03. BookCard/BookCard";
import { EmptyCard } from "../../Components/04. EmptyCard/EmptyCard";

export const WishList = () => {
  const {state, serchState} = useContext(BookContext);
  console.log("state wishlist", serchState);
  return <div>
    <Header/>
    <div className="wishlist-container">
      <h1 className="wishlist-header">My Wishlist</h1>
      <div className="wishlist-center">
        {
          state.wishlist.length !==0 ? <div className="wishlist-list">
          {
            state.wishlist.map(item => <BookCard item={item} />)
          }
        </div> : <EmptyCard text="Wishlist"/>
        }
      </div>
    </div>
    <Footer/>
  </div>
}