import Mockman from "mockman-js";
import {Routes, Route} from "react-router-dom";

import "./App.css";
import {HomePage} from "./Pages/01. HomePage/HomePage"
import { Signup } from "./Pages/02. Signup/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
