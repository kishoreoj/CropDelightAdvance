// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './Components/Register/RegisterPage';
import Login from './Components/Login/LoginPage';
import Home from './Components/Home/HomePage';
import AddWorkPage from './Components/AddWork/AddWorkPage';
import ProductForm from './Components/ProductForm/ProductForm';
import Products from './Components/Products/Products';
import Works from './Components/Works/Works';
import Customerproducts from './Components/Customerproducts/Products';
import Checkout from './Components/Checkout/Checkout';
import Farmer from './Components/Farmer/Farmer';
import Customer from './Components/Customer/Customer';
import Worker from './Components/Worker/Worker';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/product-list" element={<Products />} />
          <Route path="/add-work" element={<AddWorkPage />} />
          <Route path="/list-work" element={<Works />} />
          <Route path="/cust-product" element={<Customerproducts />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/Farmer" element={<Farmer />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/Worker" element={<Worker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
