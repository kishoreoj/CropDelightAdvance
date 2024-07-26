import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';
import { Table, Button } from 'react-bootstrap'; // Importing Bootstrap components

const Worker = () => {
  const [workData, setWorkData] = useState([]);
  const [error, setError] = useState(null); // State to hold error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/works'); // Make sure this URL is correct
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWorkData(data);
      } catch (err) {
        console.error('Failed to fetch work data:', err);
        setError('Failed to load work data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="container mt-4">
        <h2>Works Available at Different Farms</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Show error message */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SNO</th>
              <th>Work Title</th>
              <th>Salary</th>
              <th>Hours</th>
              <th>Description</th>
              <th>Farm Name</th>
              <th>Farmer Address</th> {/* New column */}
              <th>Farm Location Address</th> {/* New column */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {workData.map((work, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{work.workTitle}</td>
                <td>{work.salary}</td>
                <td>{work.hours}</td>
                <td>{work.description}</td>
                <td>{work.farmName}</td>
                <td>{work.farmerAddress?.address || 'N/A'}</td> {/* Separate Farmer Address */}
                <td>{work.farmerAddress?.farmLocation || 'N/A'}</td> {/* Separate Farm Location Address */}
                <td>
                  <Button variant="primary" onClick={() => handleApply(work)}>Apply</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </div>
  );

  function handleApply(work) {
    alert(`Applied for ${work.workTitle}`);
  }
};

export default Worker;
