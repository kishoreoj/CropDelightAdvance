import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './FarmerProduct.css';
import EditProduct from '../FarmerProduct/EditProduct'; // Adjust path if necessary

const ProductsView = ({ username }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/products?username=${username}`);
      if (response.ok) {
        const productsData = await response.json();
        setProducts(productsData);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    }
  }, [username]); // Use username as a dependency here

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Add fetchProducts here

  const editProduct = (product) => {
    setEditingProduct(product);
  };

  return (
    <div>
      {editingProduct ? (
        <EditProduct product={editingProduct} />
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
                  <button className="edit-btn" onClick={() => editProduct(product)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
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
