import React, { useState } from 'react';
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';
import ProductsView from '../Products/ProductsView'; // Ensure the path is correct
import YourProducts from '../FarmerProduct/YourProducts';
import AddProduct from '../FarmerProduct/AddProduct';
import DeleteProduct from '../FarmerProduct/DeleteProduct';
import EditProduct from '../FarmerProduct/EditProduct';

const Customer = () => {
  const [view, setView] = useState('yourProducts');

  return (
    <div>
      <Navigation />
      <div className="button-group" style={{ marginBottom: '20px' }}>
       
        <button onClick={() => setView('yourProducts')}>Your Products</button>
        <button onClick={() => setView('addProduct')}>Add Product</button>
        <button onClick={() => setView('deleteProduct')}>Delete Product</button>
        <button onClick={() => setView('editProduct')}>Edit Product</button>
        <button onClick={() => setView('products')}>Products</button>
      </div>
      <div className="content">
        {view === 'products' && <ProductsView />}
        {view === 'yourProducts' && <YourProducts />}
        {view === 'addProduct' && <AddProduct />}
        {view === 'deleteProduct' && <DeleteProduct />}
        {view === 'editProduct' && <EditProduct />}
      </div>
      <Footer />
    </div>
  );

};

export default Customer;
