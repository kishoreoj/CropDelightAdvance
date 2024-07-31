import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './FarmerProduct.css';
import EditProduct from '../FarmerProduct/EditProduct'; // Adjust path if necessary
import { useAuth } from '../../context/AuthContext'; // Adjust path as needed

const ProductsView = () => {
  const { user } = useAuth(); // Retrieve user object from context
  const username = user?.username; // Extract username from user object

  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    if (!username) {
      setError('Username is required to fetch products.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/products?username=${encodeURIComponent(username)}`);
      if (response.ok) {
        const productsData = await response.json();
        if (Array.isArray(productsData)) {
          setProducts(productsData);
          setError(''); // Clear previous errors if successful
        } else {
          setError('Unexpected data format received.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    }
  }, [username]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const editProduct = (product) => {
    setEditingProduct(product);
  };

  const handleEditComplete = () => {
    setEditingProduct(null);
    fetchProducts(); // Refetch products after editing is complete
  };

  return (
    <div>
      {editingProduct ? (
        <EditProduct product={editingProduct} onEditComplete={handleEditComplete} />
      ) : (
        <div className="Products">
          <h2 className='head'>Product List</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="product-grid">
            {products.length === 0 && !error && <p>No products found.</p>}
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
