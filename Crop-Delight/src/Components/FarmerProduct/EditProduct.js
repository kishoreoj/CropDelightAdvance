import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AddProduct.css'; // Reuse the same styles

const EditProduct = ({ product, onEditComplete }) => {
  const { user } = useAuth();
  
  const [category, setCategory] = useState(product.category || '');
  const [productName, setProductName] = useState(product.productName || '');
  const [customCategory, setCustomCategory] = useState('');
  const [customProductName, setCustomProductName] = useState('');
  const [weight, setWeight] = useState(product.weight || '');
  const [quantity, setQuantity] = useState(product.quantity || '');
  const [price, setPrice] = useState(product.price || '');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const categories = [
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
  ];

  const products = {
    "Leafy Greens and Cruciferous Vegetables": ["Spinach", "Kale", "Lettuce", "Swiss chard", "Arugula", "Broccoli", "Cauliflower", "Brussels sprouts", "Cabbage", "Bok choy"],
    "Root Vegetables and Tubers": ["Carrots", "Beets", "Radishes", "Turnips", "Parsnips", "Potatoes", "Sweet potatoes", "Yams"],
    "Alliums and Stalk Vegetables": ["Onions", "Garlic", "Leeks", "Shallots", "Chives", "Celery", "Asparagus", "Rhubarb"],
    "Legumes and Nightshades": ["Green beans", "Peas", "Lentils", "Chickpeas", "Soybeans", "Tomatoes", "Bell peppers", "Eggplant"],
    "Gourds, Squashes, and Other Vegetables": ["Zucchini", "Pumpkin", "Butternut squash", "Acorn squash", "Corn", "Mushrooms", "Okra"],
    "Berries": ["Strawberries", "Blueberries", "Raspberries", "Blackberries", "Cranberries"],
    "Citrus and Tropical Fruits": ["Oranges", "Lemons", "Limes", "Grapefruits", "Tangerines", "Bananas", "Pineapples", "Mangoes", "Papayas", "Kiwis"],
    "Stone Fruits and Pomes": ["Peaches", "Plums", "Cherries", "Apricots", "Nectarines", "Apples", "Pears", "Quinces"],
    "Melons, Drupes, and Other Fruits": ["Watermelons", "Cantaloupes", "Honeydew melons", "Dates", "Coconuts", "Avocados", "Grapes", "Figs", "Pomegranates"]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (weight <= 0 || quantity <= 0 || price <= 0) {
      setError('Weight, Quantity, and Price must be greater than zero.');
      setSuccessMessage('');
      return;
    }

    const finalCategory = category === 'Others' ? customCategory : category;
    const finalProductName = productName === 'Others' ? customProductName : productName;

    const formData = new FormData();
    formData.append('category', finalCategory);
    formData.append('productName', finalProductName);
    formData.append('weight', weight);
    formData.append('quantity', quantity);
    formData.append('price', price);
    if (image) formData.append('image', image);
    formData.append('username', user.username);

    try {
      const response = await fetch(`http://localhost:3000/products/${product._id}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        setSuccessMessage('Product updated successfully');
        setError('');
        setTimeout(() => onEditComplete(), 1000); // Notify parent to switch view
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Product update failed');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during product update:', error);
      setError('Error during product update');
      setSuccessMessage('');
    }
  };

  return (
    <div className="AddProduct">
      <h2>Edit Product</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
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
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Enter custom category"
              required
            />
          )}
        </div>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <select id="productName" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required>
            <option value="">Select Product</option>
            {(products[category] || []).map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
            <option value="Others">Others</option>
          </select>
          {productName === 'Others' && (
            <input
              type="text"
              id="customProductName"
              name="customProductName"
              value={customProductName}
              onChange={(e) => setCustomProductName(e.target.value)}
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
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
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
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div>
          <label htmlFor="image">Upload New Image (Optional):</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
