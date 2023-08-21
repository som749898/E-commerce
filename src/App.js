import Mockman from "mockman-js";
import {Routes, Route} from "react-router-dom";

import "./App.css";
import {HomePage} from "./Pages/01. HomePage/HomePage"
import { Signup } from "./Pages/02. Signup/Signup";
import {ProductList} from "./Pages/03. ProductList/ProductList";
import {ProductDetail} from "./Pages/04. ProductDetail/ProductDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/book/:id" element={<ProductDetail/>} />
      </Routes>
    </div>
  );
}

export default App;
