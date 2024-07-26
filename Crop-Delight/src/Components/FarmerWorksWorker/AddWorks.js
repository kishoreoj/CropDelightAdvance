import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddWorks.css';

// Higher-order component to pass navigate prop
function withNavigate(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class AddWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workTitle: '',
      salary: '',
      hours: '',
      description: '',
      error: '',
      successMessage: '',
    };
  }

  // Handle change
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle input validation to prevent negative values
  handleInputValidation = (e) => {
    const { name, value } = e.target;
    if (value < 0) {
      this.setState({ [name]: 0 });
    }
  };

  // Handle submit
  handleSubmit = async (e) => {
    e.preventDefault();
    const { workTitle, salary, hours, description } = this.state;
    const username = localStorage.getItem('username'); // Retrieve username from local storage

    if (!username) {
      this.setState({ error: 'Username not found in local storage' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/work/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ workTitle, salary, hours, description, username })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Work added successfully:', responseData);
        this.setState({ successMessage: 'Work added successfully', error: '' });
        setTimeout(() => this.setState({ successMessage: '' }), 3000); // Clear success message after 3 seconds
      } else {
        const errorData = await response.json();
        console.error('Work addition failed:', errorData);
        this.setState({ error: 'Work addition failed: ' + errorData.message, successMessage: '' });
      }
    } catch (error) {
      console.error('Error during work addition:', error);
      this.setState({ error: 'Error during work addition', successMessage: '' });
    }
  };

  render() {
    return (
      <div className="AddWorks">
        <h2>Add Work</h2>
        {this.state.successMessage && (
          <div className="success-message">{this.state.successMessage}</div>
        )}
        {this.state.error && <p className="error-message">{this.state.error}</p>}
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
            <label htmlFor="salary">Salary per Hour ($):</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={this.state.salary}
              onChange={this.handleChange}
              onBlur={this.handleInputValidation}
              required
              min="0.01"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="hours">Number of Hours:</label>
            <input
              type="number"
              id="hours"
              name="hours"
              value={this.state.hours}
              onChange={this.handleChange}
              onBlur={this.handleInputValidation}
              required
              min="0"
              step="1"
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Add Work</button>
        </form>
      </div>
    );
  }
}

export default withNavigate(AddWorks);
