import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';


// Higher-order component to pass navigate prop
function withNavigate(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      productName: '',
      customCategory: '',
      customProductName: '',
      weight: '',
      quantity: '',
      price: '',
      image: null,
      categories: [
        "Leafy Greens and Cruciferous Vegetables",
        "Root Vegetables and Tubers",
        "Alliums and Stalk Vegetables",
        "Legumes and Nightshades",
        "Gourds, Squashes, and Other Vegetables",
        "Berries",
        "Citrus and Tropical Fruits",
        "Stone Fruits and Pomes",
        "Melons, Drupes, and Other Fruits",
        "Others"
      ],
      products: {
        "Leafy Greens and Cruciferous Vegetables": ["Spinach", "Kale", "Lettuce", "Swiss chard", "Arugula", "Broccoli", "Cauliflower", "Brussels sprouts", "Cabbage", "Bok choy"],
        "Root Vegetables and Tubers": ["Carrots", "Beets", "Radishes", "Turnips", "Parsnips", "Potatoes", "Sweet potatoes", "Yams"],
        "Alliums and Stalk Vegetables": ["Onions", "Garlic", "Leeks", "Shallots", "Chives", "Celery", "Asparagus", "Rhubarb"],
        "Legumes and Nightshades": ["Green beans", "Peas", "Lentils", "Chickpeas", "Soybeans", "Tomatoes", "Bell peppers", "Eggplant"],
        "Gourds, Squashes, and Other Vegetables": ["Zucchini", "Pumpkin", "Butternut squash", "Acorn squash", "Corn", "Mushrooms", "Okra"],
        "Berries": ["Strawberries", "Blueberries", "Raspberries", "Blackberries", "Cranberries"],
        "Citrus and Tropical Fruits": ["Oranges", "Lemons", "Limes", "Grapefruits", "Tangerines", "Bananas", "Pineapples", "Mangoes", "Papayas", "Kiwis"],
        "Stone Fruits and Pomes": ["Peaches", "Plums", "Cherries", "Apricots", "Nectarines", "Apples", "Pears", "Quinces"],
        "Melons, Drupes, and Other Fruits": ["Watermelons", "Cantaloupes", "Honeydew melons", "Dates", "Coconuts", "Avocados", "Grapes", "Figs", "Pomegranates"]
      },
      error: '',
      successMessage: ''
    };
  }

  // handle change
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handle image change
  handleImageChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  // handle category change
  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value, productName: '' });
  };

  // handle submit
  handleSubmit = async (e) => {
    e.preventDefault();
    const { category, productName, customCategory, customProductName, weight, quantity, price, image } = this.state;
    const { navigate } = this.props;
    const username = localStorage.getItem('username'); // Retrieve username from local storage
    
    console.log('Retrieved username:', username); // Debugging line
  
    // Validate for zero values
    if (weight <= 0 || quantity <= 0 || price <= 0) {
      this.setState({ error: 'Weight, Quantity, and Price must be greater than zero.', successMessage: '' });
      return;
    }
  
    // Determine final category and product name
    const finalCategory = category === 'Others' ? customCategory : category;
    const finalProductName = productName === 'Others' ? customProductName : productName;
  
    // Create form data
    const formData = new FormData();
    formData.append('category', finalCategory);
    formData.append('productName', finalProductName);
    formData.append('weight', weight);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('username', username);
  
    try {
      const response = await fetch('http://localhost:3000/product', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Product added successfully:', responseData);
        this.setState({ successMessage: 'Product added successfully', error: '' });
        setTimeout(() => this.setState({ successMessage: '' }), 3000); // Clear success message after 3 seconds
      } else {
        const errorData = await response.json();
        console.error('Product addition failed:', errorData);
        this.setState({ error: 'Product addition failed', successMessage: '' });
      }
    } catch (error) {
      console.error('Error during product addition:', error);
      this.setState({ error: 'Error during product addition', successMessage: '' });
    }
  };
  

  render() {
    const { category, products, categories, productName } = this.state;
    const productOptions = category && products[category] ? products[category] : [];

    return (
      <div>
       
        <div className="AddProduct">
          <h2>Add Product</h2>
          {this.state.successMessage && (
            <div className="success-message">{this.state.successMessage}</div>
          )}
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="category">Category:</label>
              <select id="category" name="category" value={this.state.category} onChange={this.handleCategoryChange} required>
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {category === 'Others' && (
                <input
                  type="text"
                  id="customCategory"
                  name="customCategory"
                  value={this.state.customCategory}
                  onChange={this.handleChange}
                  placeholder="Enter custom category"
                  required
                />
              )}
            </div>
            <div>
              <label htmlFor="productName">Product Name:</label>
              <select id="productName" name="productName" value={this.state.productName} onChange={this.handleChange} required>
                <option value="">Select Product</option>
                {productOptions.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
                <option value="Others">Others</option>
              </select>
              {productName === 'Others' && (
                <input
                  type="text"
                  id="customProductName"
                  name="customProductName"
                  value={this.state.customProductName}
                  onChange={this.handleChange}
                  placeholder="Enter custom product name"
                  required
                />
              )}
            </div>
            <div>
              <label htmlFor="weight">Weight (grams):</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={this.state.weight}
                onChange={this.handleChange}
                min="10"
                step="1"
                required
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity (in number):</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
                min="1"
                required
              />
            </div>
            <div>
              <label htmlFor="price">Price ($):</label>
              <input
                type="number"
                id="price"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
                min="0.01"
                step="0.01"
                required
              />
            </div>
            <div>
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={this.handleImageChange}
                required
              />
            </div>
            {this.state.error && <p className="error-message">{this.state.error}</p>}
            <button type="submit">Add Product</button>
          </form>
        </div>
       
      </div>
    );
  }
}

export default withNavigate(AddProduct);
