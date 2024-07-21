// Components/Farmer/Farmer.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';
import './Farmer.css'; // Import the CSS file
import ProductsImage from '../assets/Products.png';
import customerImage from '../assets/customer.png';
import Produces from '../assets/Produces.png';
import workerImage from '../assets/worker.png';

const Farmer = () => {
  return (
    <div>
      <Navigation />
      <div className="content">
        <h1>Farmer Page</h1>
        <div className="blocks">
          <Link to="/FarmerProducts" className="block">
            <img src={ProductsImage} alt="Products" />
            <h2>Products</h2>
            <p>Manage Your Products Here! Add, Delete, Edit Your Products For Sale</p>
          </Link>
          <Link to="/Orders" className="block">
            <img src={customerImage} alt="Customer Orders & Sales" />
            <h2>Customer Orders & Sales</h2>
            <p>Order Management and Sales Monitoring</p>
          </Link>
          <Link to="/Production" className="block">
            <img src={Produces} alt="Produces & Problems" />
            <h2>Produces & Problems</h2>
            <p>Add and Track your Problems and Production Costs</p>
          </Link>
          <Link to="/WorksWorkers" className="block">
            <img src={workerImage} alt="Works & Workers" />
            <h2>Works & Workers</h2>
            <p>Add Works, Hire Worker, Manage Works and Worker</p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Farmer;
