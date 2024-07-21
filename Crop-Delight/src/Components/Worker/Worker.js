// Components/Worker/Worker.js

import React from 'react';
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';

const Worker = () => {
  return (
    <div>
      <Navigation />
      <div className="content">
        <h1>Worker Page</h1>
        {/* Add worker-specific content here */}
      </div>
      <Footer />
    </div>
  );
};

export default Worker;
