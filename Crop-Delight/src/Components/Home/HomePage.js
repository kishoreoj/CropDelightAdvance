import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home/HomePage.css';
import fruits from '../../Images/fruits.jpg';
import leafy from '../../Images/leafy.jpg';
import melons from '../../Images/melon.jpg';
import citrusfruits from '../../Images/citrusfruits.jpg';
import root from '../../Images/root.jpg';
import tropical from '../../Images/tropical.webp';
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('username');

  // Redirect to login page if not logged in
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleAddProduct = () => {
    navigate('/add-product');
  };
  const handleListProduct = () => {
    navigate('/product-list');
  };
  
  const handleAddWork = () => {
    navigate('/add-work');
  };

  const handleListWork = () => {
    navigate('/list-work');
  };

  // Render home page content only if logged in
  return (
    <div className="home-container">
      {isLoggedIn && <Navigation />} {/* Add the navigation bar if logged in */}
      {isLoggedIn && (
        <>
          <header className="header">
            <h1>Crop Delight</h1>
            <p>From Farm to Your Doorstep. Connect Directly with Local Farmers for Fresh, Organic Goodness!</p>
          </header>
          <h2>WELCOME TO ORGANIC STORE !!</h2>
          <div className="buttons">
            <button onClick={handleAddProduct}>Add Product</button>
            <button onClick={handleListProduct}>List Product</button>
            <button onClick={handleAddWork}>Add Work</button>
            <button onClick={handleListWork}>List Work</button>
          </div>
          <div className="products">
            <div className="product-card">
              <img src={fruits} alt="Fruits" />
              <h3>FRUITS</h3>
              <p>Description of first product</p>
              <p>$10.99</p>
            </div>
            <div className="product-card">
              <img src={leafy} alt="Leafy Greens" />
              <h3>LEAFY GREENS</h3>
              <p>Description of second product</p>
              <p>$10.99</p>
            </div>
            <div className="product-card">
              <img src={melons} alt="Melons" />
              <h3>MELONS</h3>
              <p>Description of third product</p>
              <p>$10.99</p>
            </div>
            <div className="product-card">
              <img src={tropical} alt="Tropical Fruits" />
              <h3>TROPICAL FRUITS</h3>
              <p>Description of fourth product</p>
              <p>$10.99</p>
            </div>
            <div className="product-card">
              <img src={root} alt="Root Vegetables" />
              <h3>ROOT VEGETABLES</h3>
              <p>Description of fifth product</p>
              <p>$10.99</p>
            </div>
            <div className="product-card">
              <img src={citrusfruits} alt="Citrus Fruits" />
              <h3>CITRUS FRUITS</h3>
              <p>Description of sixth product</p>
              <p>$10.99</p>
            </div>
          </div>
        </>
      )}
      <Footer/>
    </div>
  );
};

export default HomePage;
