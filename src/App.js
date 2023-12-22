import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ProductCategory from "./pages/products/ProductCategory";


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/product/category/:category" element={<ProductCategory />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
