import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Products.css';
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';

// Higher-order component to pass navigate prop
function withNavigate(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      error: ''
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products'); // Update the URL if necessary
      if (response.ok) {
        const products = await response.json();
        this.setState({ products });
      } else {
        console.error('Failed to fetch products');
        this.setState({ error: 'Failed to fetch products' });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      this.setState({ error: 'Error fetching products' });
    }
  };

  addToCart = (product) => {
    this.setState(prevState => ({
      cart: [...prevState.cart, product]
    }));
  };

  goToCheckout = () => {
    const { navigate } = this.props;
    navigate('/checkout', { state: { cart: this.state.cart } });
  };

  render() {
    const { products, cart, error } = this.state;

    return (
      <div>
        <Navigation />
        <div>
          <div className="cart-icon">
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            <span className="cart-count">{cart.length}</span>
            <button className="checkout-btn" onClick={this.goToCheckout}>Checkout</button>
          </div>
          <div>
             
          </div>
        </div>
        
        <div className="Products">
          <h2 className='head'>Product For Sale</h2>
          {error && <p className="error-message">{error}</p>}
          <ul>
            {products.map(product => (
              <li key={product._id}>
                <h3>{product.productName}</h3>
                <p>Price: {product.price}</p>
                <p>Category: {product.category}</p>
                <p>Sold By: {product.username}</p>
                <button className="add-to-cart-btn" onClick={() => this.addToCart(product)}>Add to Cart</button>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withNavigate(Products);
