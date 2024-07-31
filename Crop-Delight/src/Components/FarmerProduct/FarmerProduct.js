import React, { useState } from 'react';
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';
import ProductsView from '../Products/ProductsView'; // Ensure the path is correct
import YourProducts from '../FarmerProduct/YourProducts';
import AddProduct from '../FarmerProduct/AddProduct';
import DeleteProduct from '../FarmerProduct/DeleteProduct';
import './FarmerProduct.css'; // Import the CSS file

const Customer = () => {
  const [view, setView] = useState('yourProducts');

  return (
    <div>
      <Navigation />
      <div className="button-group">
        <button className="your-products-btn" onClick={() => setView('yourProducts')}>Your Products</button>
        <button className="add-product-btn" onClick={() => setView('addProduct')}>Add Product</button>
        <button className="delete-product-btn" onClick={() => setView('deleteProduct')}>Manage Product</button>
        <button className="products-btn" onClick={() => setView('products')}>Products</button>
      </div>
      <div className="content">
        {view === 'products' && <ProductsView />}
        {view === 'yourProducts' && <YourProducts />}
        {view === 'addProduct' && <AddProduct />}
        {view === 'deleteProduct' && <DeleteProduct />}
      </div>
      <Footer />
    </div>
  );
};

export default Customer;
