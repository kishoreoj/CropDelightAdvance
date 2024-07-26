import React, { useState } from 'react';
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';
import ProductsView from '../Products/ProductsView'; // Ensure the path is correct
import OrdersSummary from '../Orders/OrdersSummary'; // Create this component for Order Summary

const Customer = () => {
  const [view] = useState('products');

  return (
    <div>
      <Navigation />
      <div className="content">

        {view === 'products' && <ProductsView />}
        {view === 'orders' && <OrdersSummary />} {/* Render OrdersSummary component */}
      </div>
      <Footer />
    </div>
  );
};

export default Customer;