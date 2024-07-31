import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './DeleteProduct.css';
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

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleEditComplete = () => {
    setEditingProduct(null);
    fetchProducts(); // Refetch products after editing is complete
  };

  const deleteProduct = async (productId, productName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the product "${productName}"?`);
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/products/${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setProducts(products.filter(product => product._id !== productId));
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Error deleting product');
      }
    }
  };

  return (
    <div>
      {editingProduct ? (
        <EditProduct product={editingProduct} onEditComplete={handleEditComplete} />
      ) : (
        <div className="Products">
          <h2 className='head'>Product List</h2>
          {error && <p className="error-message">{error}</p>}
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Weight</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Category</th>
                <th>Added by</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && !error && <tr><td colSpan="8">No products found.</td></tr>}
              {products.map(product => (
                <tr key={product._id}>
                  <td><img src={`http://localhost:3000/${product.imagePath}`} alt={product.productName} className="product-image" /></td>
                  <td>{product.productName}</td>
                  <td>{product.weight} grams</td>
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.username}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditClick(product)}>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button className="delete-btn" onClick={() => deleteProduct(product._id, product.productName)}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductsView;
