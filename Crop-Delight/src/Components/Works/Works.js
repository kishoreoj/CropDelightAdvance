import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './Works.css';
import Navigation from '../Navigation/NavigationPage'; // Import Navigation component
import Footer from '../Footer/FooterPage';

// Higher-order component to pass navigate prop
function withNavigate(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class Works extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      error: ''
    };
  }

  componentDidMount() {
    this.fetchWorks();
  }

  fetchWorks = async () => {
    try {
      const response = await fetch('http://localhost:3000/works'); // Update the URL if necessary
      if (response.ok) {
        const works = await response.json();
        this.setState({ works });
      } else {
        console.error('Failed to fetch works');
        this.setState({ error: 'Failed to fetch works' });
      }
    } catch (error) {
      console.error('Error fetching works:', error);
      this.setState({ error: 'Error fetching works' });
    }
  };

  render() {
    const { works, error } = this.state;

    return (
      <div>
        <Navigation /> {/* Include Navigation component */}
        <div className="Works">
          <h2 className='head'>Work List</h2>
          {error && <p className="error-message">{error}</p>}
          <ul>
            {works.map(work => (
              <li key={work._id}>
                <h3>{work.workTitle}</h3>
                <p>Salary: {work.salary}</p>
                <p>Description: {work.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withNavigate(Works);