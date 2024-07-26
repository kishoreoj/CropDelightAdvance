import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Products.css';
import CheckoutView from '../Checkout/CheckoutView'; // Adjust path if necessary

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

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

  const toggleCheckout = () => {
    setShowCheckout(prevShow => !prevShow);
  };

  return (
    <div>
      {!showCheckout && (
        <div className="cart-icon">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          <span className="cart-count">{cart.length}</span>
          <button className="checkout-btn" onClick={toggleCheckout}>
            {showCheckout ? 'Hide Checkout' : 'Checkout'}
          </button>
        </div>
      )}
      {showCheckout ? (
        <CheckoutView cart={cart} /> // Render CheckoutView component if showCheckout is true
      ) : (
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
      )}
    </div>
  );
};

export default ProductsView;
