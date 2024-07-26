import React, { Component } from 'react';
import './FarmerWorksWorker.css';
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';
import AddWorks from './AddWorks';
import WorksManagement from './WorksManagement';
import WorkerHire from './WorkerHire';
import WorkerManagement from './WorkerManagement';

class WorksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSection: 'AddWorks' // Default section
    };
  }

  handleSectionChange = (section) => {
    this.setState({ selectedSection: section });
  };

  renderSection = () => {
    const { selectedSection } = this.state;
    switch (selectedSection) {
      case 'AddWorks':
        return <AddWorks />;
      case 'WorksManagement':
        return <WorksManagement />;
      case 'WorkerHire':
        return <WorkerHire />;
      case 'WorkerManagement':
        return <WorkerManagement />;
      default:
        return <AddWorks />;
    }
  };

  render() {
    return (
      <div>
        <Navigation />
        <div className="Works">
          <div className="navigation-buttons">
            <button onClick={() => this.handleSectionChange('AddWorks')}>Add Works</button>
            <button onClick={() => this.handleSectionChange('WorksManagement')}>Works Management</button>
            <button onClick={() => this.handleSectionChange('WorkerHire')}>Worker Hire</button>
            <button onClick={() => this.handleSectionChange('WorkerManagement')}>Worker Management</button>
          </div>
          <div className="section-content">
            {this.renderSection()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default WorksPage;
