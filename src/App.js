import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Details from "./pages/Details";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

import ProductContextProvider from "./context/ProductContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <ProductContextProvider>

        <BrowserRouter>

          <Navbar>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Details />} />

            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <ToastContainer />

      </ProductContextProvider>

    </>
  );
}

export default App;
