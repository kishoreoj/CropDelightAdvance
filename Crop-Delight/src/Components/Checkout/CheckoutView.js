import React, { useState, useEffect } from 'react';
import './Checkout.css'; // Import CSS file

const CheckoutView = ({ cart, userId }) => {
  const [cartItems, setCartItems] = useState(cart.map(item => ({ ...item, quantity: 1 })));
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [order, setOrder] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', address: '' });

  useEffect(() => {
    if (userId) {
      // Fetch logged-in user's details from the backend using userId
      fetch(`/api/user-details/${userId}`)
        .then(response => response.json())
        .then(data => {
          if (data.name && data.address) {
            setUserDetails({ name: data.name, address: data.address });
          } else {
            console.error('Unexpected user details format:', data);
          }
        })
        .catch(error => console.error('Error fetching user details:', error));
    }
  }, [userId]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const calculateTaxes = (total) => {
    // Assuming a fixed tax rate of 10%
    const taxRate = 0.10;
    return total * taxRate;
  };

  const handlePayment = () => {
    // Generate order ID
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const sequenceNumber = Math.floor(Math.random() * 1000);
    const orderId = `ORD${dateStr}${sequenceNumber}`;

    // Calculate totals and taxes
    const total = calculateTotal();
    const taxes = calculateTaxes(total);
    const grandTotal = total + taxes;

    // Example of order data
    const orderData = {
      orderId,
      customerName: userDetails.name,
      shippingAddress: userDetails.address,
      cartItems: cartItems.map(item => ({
        productId: item._id,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        farmerId: item.farmerId // Ensure you include farmerId in the cart item
      })),
      total,
      taxes,
      grandTotal,
      paymentMethod,
      paymentDetails
    };

    // Send orderData to the backend
    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Order successfully created:', data);
      setOrder(orderData);
      setShowReceipt(true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    setShowPaymentForm(false);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentDetailsChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="Checkout">
      <h2 className="head">Checkout</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : !showReceipt ? (
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
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>{item.category}</td>
                  <td>{item.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-section">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
            {!showPaymentForm ? (
              <button className="payment-button" onClick={() => setShowPaymentForm(true)}>Proceed to Payment</button>
            ) : (
              <div className="payment-form">
                <h3>Select Payment Method</h3>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={handlePaymentMethodChange}
                  />
                  Credit Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="debit"
                    checked={paymentMethod === 'debit'}
                    onChange={handlePaymentMethodChange}
                  />
                  Debit Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="interact"
                    checked={paymentMethod === 'interact'}
                    onChange={handlePaymentMethodChange}
                  />
                  Interact
                </label>

                {paymentMethod && (
                  <div className="payment-details-form">
                    <h3>Enter Payment Details</h3>
                    {paymentMethod === 'credit' || paymentMethod === 'debit' ? (
                      <div>
                        <label>
                          Card Number:
                          <input
                            type="text"
                            name="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handlePaymentDetailsChange}
                          />
                        </label>
                        <label>
                          Expiry Date:
                          <input
                            type="text"
                            name="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={handlePaymentDetailsChange}
                          />
                        </label>
                        <label>
                          CVV:
                          <input
                            type="text"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handlePaymentDetailsChange}
                          />
                        </label>
                      </div>
                    ) : (
                      <div>
                        {/* Add details for Interact payment if needed */}
                      </div>
                    )}
                    <button onClick={handlePayment}>Pay</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="order-summary">
          <h2>Order Summary</h2>
          <p>Order Number: {order.orderId}</p>
          <p>Customer Name: {order.customerName}</p>
          <p>Shipping Address: {order.shippingAddress}</p>
          <h3>Items:</h3>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Subtotal: ${order.total.toFixed(2)}</p>
          <p>Taxes: ${order.taxes.toFixed(2)}</p>
          <p>Total: ${order.grandTotal.toFixed(2)}</p>
          <p>Thank you for your purchase!</p>
          <p>Cancel note: If you wish to cancel your order, please contact customer support.</p>
          <p>Refund Policy: Refunds are accepted within 30 days of purchase. Please refer to our refund policy for more details.</p>
          <button onClick={handlePrint}>Print Receipt</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutView;
