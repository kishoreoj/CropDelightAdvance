import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Products.css';
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      if (response.ok) {
        const productsData = await response.json();
        setProducts(productsData);
      } else {
        console.error('Failed to fetch products');
        setError('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    }
  };

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  return (
    <div>
      <Navigation />
      <div className="cart-icon">
        <FontAwesomeIcon icon={faShoppingCart} size="2x" />
        <span className="cart-count">{cart.length}</span>
        <button className="checkout-btn" onClick={goToCheckout}>Checkout</button>
      </div>
      <div className="Products">
        <h2 className='head'>Product List</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="product-grid">
          {products.map(product => (
            <div key={product._id} className="product-item">
              <img src={`http://localhost:3000/${product.imagePath}`} alt={product.productName} />
              <div className="product-details">
                <h3>{product.productName}</h3>
                <p className="weight">Weight: {product.weight} grams</p>
                <p className="quantity">Quantity: {product.quantity}</p>
                <p className="price">Price: ${product.price}</p>
                <p className="category">Category: {product.category}</p>
                <p className="username">Added by: {product.username}</p>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
