import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddWorkPage.css';
import Navigation from '../Navigation/NavigationPage'; // Import Navigation component
import Footer from '../Footer/FooterPage';

// Higher-order component to pass navigate prop
function withNavigate(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class AddWorkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workTitle: '',
      salary: '',
      description: '',
      error: '',
      successMessage: ''
    };
  }

  // handle change
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // submit handle
  handleSubmit = async (e) => {
    e.preventDefault();
    const { workTitle, salary, description } = this.state;
    const { navigate } = this.props;
    const username = localStorage.getItem('username'); // Retrieve username from local storage

    try {
      const response = await fetch('http://localhost:3000/work', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ workTitle, salary, description, username })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Work added successfully:', responseData);
        this.setState({ successMessage: 'Work added successfully', error: '' });
        setTimeout(() => this.setState({ successMessage: '' }), 3000); // Clear success message after 3 seconds
      } else {
        const errorData = await response.json();
        console.error('Work addition failed:', errorData);
        this.setState({ error: 'Work addition failed', successMessage: '' });
      }
    } catch (error) {
      console.error('Error during Work addition:', error);
      this.setState({ error: 'Error during Work addition', successMessage: '' });
    }
  };

  render() {
    return (
      <div>
        <Navigation /> {/* Include Navigation component */}
        <div className="AddWorkPage">
          <h2>Add Work</h2>
          {this.state.successMessage && (
            <div className="success-message">{this.state.successMessage}</div>
          )}
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="workTitle">Work Title:</label>
              <input
                type="text"
                id="workTitle"
                name="workTitle"
                value={this.state.workTitle}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="salary">Salary:</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={this.state.salary}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                required
              />
            </div>
            {this.state.error && <p className="error-message">{this.state.error}</p>}
            <button type="submit">Add Work</button>
          </form>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withNavigate(AddWorkPage);
