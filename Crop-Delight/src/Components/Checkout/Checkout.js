import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Checkout.css'; // Import CSS file
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';

const Checkout = () => {
  const location = useLocation();
  const { cart } = location.state || { cart: [] };

  // Initialize cart items with quantity property
  const initialCartItems = cart.map(item => ({ ...item, quantity: 1 }));
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Function to handle quantity change
  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
  };

  // Function to calculate total price
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  // Function to handle payment
  const handlePayment = () => {
    // Implement payment logic here
    console.log('Processing payment...');
  };

  return (
    <div>
      <Navigation />
      <div className="Checkout">
        <h2 className="head">Checkout</h2>
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Category</th>
                  <th>Sold By</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>${item.price}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                      />
                    </td>
                    <td>${(item.price * item.quantity)}</td>
                    <td>{item.category}</td>
                    <td>{item.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-section">
              <h3>Total: ${calculateTotal().toFixed(2)}</h3>
              <button className="payment-button" onClick={handlePayment}>Proceed to Payment</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
