import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductForm.css';

// Higher-order component to pass navigate prop
function withNavigate(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      price: '',
      category: '',
      error: ''
    };
  }

  // handle change
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // submit handle
  handleSubmit = async (e) => {
    e.preventDefault();
    const { productName, price, category } = this.state;
    const { navigate } = this.props;

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName, price, category })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Product added successfully:', responseData);
        this.setState({ error: 'Product added successfully' });
        alert('Product added successfully');
        navigate('/'); // Redirect to homepage or another relevant page
      } else {
        const errorData = await response.json();
        console.error('Product addition failed:', errorData);
        this.setState({ error: 'Product addition failed' });
      }
    } catch (error) {
      console.error('Error during product addition:', error);
      this.setState({ error: 'Error during product addition' });
    }
  };

  render() {
    return (
      <div className="ProductForm">
        <h2>Add Product</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={this.state.productName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
              required
            />
          </div>
          {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
          <button type="submit">Add Product</button>
        </form>
      </div>
    );
  }
}

export default withNavigate(ProductForm);
