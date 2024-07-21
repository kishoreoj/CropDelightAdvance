// Components/Customer/Customer.js

import React from 'react';
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';

const Customer = () => {
  return (
    <div>
      <Navigation />
      <div className="content">
        <h1>Customer Page</h1>
        {/* Add customer-specific content here */}
      </div>
      <Footer />
    </div>
  );
};

export default Customer;
