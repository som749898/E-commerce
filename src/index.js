import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom"

import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {BookProvider} from "./Context/BookContext";
import {PaginateProvider} from "./Context/PaginateContext";
import {AddressProvider} from "./Context/AddressContext";
import {OrderProvider} from "./Context/OrderContext";
import {LoginProvider} from "./Context/LoginContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LoginProvider>
        <BookProvider>
          <PaginateProvider>
            <AddressProvider>
              <OrderProvider>
                <App />
              </OrderProvider>
            </AddressProvider>
          </PaginateProvider>
        </BookProvider>
      </LoginProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
