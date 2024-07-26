import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Register/RegisterPage.css';
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';
import farmerImage from '../assets/farmer.png';
import customerImage from '../assets/customer.png';
import workerImage from '../assets/worker.png';



function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [farmerId, setFarmerId] = useState('');
  const [farmerLicense, setFarmerLicense] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addresses, setAddresses] = useState({
    farmerAddress: {
      street: '',
      city: '',
      province: '',
      zipCode: '',
    },
    farmLocationAddress: {
      street: '',
      city: '',
      province: '',
      zipCode: '',
    },
    shippingAddress: {
      street: '',
      city: '',
      province: '',
      zipCode: '',
    },
    communicationAddress: {
      street: '',
      city: '',
      province: '',
      zipCode: '',
    },
  });
  const [workerName, setWorkerName] = useState('');
  const [skills, setSkills] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');
  const [usernameExistsError, setUsernameExistsError] = useState('');
  const [emailExistsError, setEmailExistsError] = useState('');
  const [phoneExistsError, setPhoneExistsError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [sameAddress, setSameAddress] = useState(true);

  const handleSelectUserType = (selectedUserType) => {
    setUserType(selectedUserType);
    setShowForm(true);
    setSameAddress(true); // Set default to true for Farmer
    clearErrors(); // Clear errors when selecting new userType
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    clearErrorByName(name); // Clear error for the specific field
  
    // Phone number format validation and adjustment
    if (name === 'phone') {
      // Remove non-numeric characters from input
      const phoneNumber = value.replace(/\D/g, '');
  
      // Format the phone number as (xxx)-xxx-xxxx if 10 digits
 
      if (phoneNumber.length === 10) {
        const formattedPhoneNumber = `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
        setPhone(formattedPhoneNumber);} else {
        setPhone(value); // If not 10 digits, set as entered
      }
    } else {
      // For other fields, update state normally
      switch (name) {
        case 'username':
          setUsername(value);
          break;
        case 'password':
          setPassword(value);
          break;
        case 'confirmPassword':
          setConfirmPassword(value);
          break;
        case 'farmerName':
          setFarmerName(value);
          break;
        case 'farmerId':
          setFarmerId(value);
          break;
        case 'email':
          setEmail(value);
          break;
        case 'workerName':
          setWorkerName(value);
          break;
        case 'skills':
          setSkills(value);
          break;
        case 'customerName':
          setCustomerName(value);
          break;
        default:
          break;
      }
    }
  };
  

  const handleAddressChange = (event, addressType) => {
    const { name, value } = event.target;
  
    // Validate and format the zip code as L9T 6A6
    const formattedZipCode = formatZipCode(value);
  
    setAddresses((prevAddresses) => ({
      ...prevAddresses,
      [addressType]: {
        ...prevAddresses[addressType],
        [name]: formattedZipCode,
      },
    }));
  };
  
  const formatZipCode = (zipCode) => {
    // Remove non-alphanumeric characters
    const cleanedZipCode = zipCode.replace(/[^a-zA-Z0-9]/g, '');

    // Format the zip code as L9T 6A6 if it matches the pattern
    const zipRegex = /^[a-zA-Z]\d[a-zA-Z]\s?\d[a-zA-Z]\d$/;
    if (zipRegex.test(cleanedZipCode)) {
      // Insert space between the third and fourth characters
      const formattedZipCode = `${cleanedZipCode.slice(0, 3)} ${cleanedZipCode.slice(3)}`;
      return formattedZipCode.toUpperCase(); // Ensure uppercase format
    } else {
      return zipCode; // Return as entered if not in the correct format
    }
  };
  

  const handleFileChange = (event) => {
    setFarmerLicense(event.target.files[0]);
  };

  const handleSameAddressChange = () => {
    setSameAddress((prevSameAddress) => !prevSameAddress);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const formData = new FormData();
      formData.append('userType', userType);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('phone', phone);
    
      if (userType === 'Farmer') {
        formData.append('farmerName', farmerName);
        formData.append('farmerId', farmerId);
        formData.append('farmerLicense', farmerLicense);
        formData.append('addressStreet', addresses.farmerAddress.street);
        formData.append('addressCity', addresses.farmerAddress.city);
        formData.append('addressProvince', addresses.farmerAddress.province);
        formData.append('addressZipCode', addresses.farmerAddress.zipCode);
        formData.append('sameAddress', sameAddress);
    
        if (!sameAddress) {
          formData.append('farmLocationStreet', addresses.farmLocationAddress.street);
          formData.append('farmLocationCity', addresses.farmLocationAddress.city);
          formData.append('farmLocationProvince', addresses.farmLocationAddress.province);
          formData.append('farmLocationZipCode', addresses.farmLocationAddress.zipCode);
        }
      } else if (userType === 'Worker') {
        formData.append('workerName', workerName);
        formData.append('skills', skills);
        formData.append('addressStreet', addresses.communicationAddress.street);
        formData.append('addressCity', addresses.communicationAddress.city);
        formData.append('addressProvince', addresses.communicationAddress.province);
        formData.append('addressZipCode', addresses.communicationAddress.zipCode);
      } else if (userType === 'Customer') {
        formData.append('customerName', customerName);
        formData.append('addressStreet', addresses.shippingAddress.street);
        formData.append('addressCity', addresses.shippingAddress.city);
        formData.append('addressProvince', addresses.shippingAddress.province);
        formData.append('addressZipCode', addresses.shippingAddress.zipCode);
      }
    
      // Log FormData entries
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          body: formData,
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log('Registration successful:', data);
          setError('Registration successful');
          alert('Registration successful');
          navigate('/login'); // Redirect to login page
        } else {
          if (data.message.includes('Username already exists')) {
            setUsernameExistsError('Username already exists. Please choose a different one.');
          } else if (data.message.includes('Email already exists')) {
            setEmailExistsError('Email already exists. Please use a different email.');
          } else if (data.message.includes('Phone Number already exists')) {
            setPhoneExistsError('Phone Number already exists. Please use a different phone number.');
          } else {
            setError(data.message);
          }
        }
      } catch (error) {
        setError('Failed to register. Please try again later.');
      }
    };
    
    

  const goBackToUserTypeSelection = () => {
    setShowForm(false);
    setUserType('');
    clearErrors(); // Clear errors when going back
  };

  const clearErrorByName = (name) => {
    switch (name) {
      case 'username':
        setUsernameExistsError('');
        break;
      case 'email':
        setEmailExistsError('');
        break;
      case 'phone':
        setPhoneExistsError('');
        break;
      default:
        break;
    }
  };

  const clearErrors = () => {
    setError('');
    setUsernameExistsError('');
    setEmailExistsError('');
    setPhoneExistsError('');
  };

  const renderProvinceOptions = () => {
    const provinces = [
      'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
      'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
      'Quebec', 'Saskatchewan', 'Yukon'
    ];

    return provinces.map(province => (
      <option key={province} value={province}>{province}</option>
    ));
  };

  return (
    <div>
      <Navigation />
      <div className="register-page">
        {!showForm ? (
          <div>
            <h2 className="userSelectionHeader">Register as</h2>
            <div className="user-type-selection">
              <figure onClick={() => handleSelectUserType('Farmer')}>
                <img src={farmerImage} alt="Farmer" />
                <figcaption>Farmer</figcaption>
              </figure>
              <figure onClick={() => handleSelectUserType('Customer')}>
                <img src={customerImage} alt="Customer" />
                <figcaption>Customer</figcaption>
              </figure>
              <figure onClick={() => handleSelectUserType('Worker')}>
                <img src={workerImage} alt="Worker" />
                <figcaption>Worker</figcaption>
              </figure>
            </div>
          </div>
        ) : (
          <div className="register-form-section">
            <h2 className="userSelectionHeader">Register as {userType}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-columns">
                <div className="form-column">
                  <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={username} onChange={handleChange} />
                    {usernameExistsError && <p className="error">{usernameExistsError}</p>}
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={handleChange} />
                    {emailExistsError && <p className="error">{emailExistsError}</p>}
                  </div>
                  <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="tel" name="phone" value={phone} onChange={handleChange} />
                    {phoneExistsError && <p className="error">{phoneExistsError}</p>}
                  </div>
                </div>

                <div className="form-column">
                  {userType === 'Farmer' && (
                    <>
                      <div className="form-group">
                        <label>Farmer Name:</label>
                        <input type="text" name="farmerName" value={farmerName} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Farmer ID:</label>
                        <input type="text" name="farmerId" value={farmerId} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Farmer License:</label>
                        <input type="file" name="farmerLicense" onChange={handleFileChange} />
                      </div>
                      <div className="form-group">
                        <label>Farmer Address:</label>
                        <input type="text" name="street" placeholder="Street" value={addresses.farmerAddress.street} onChange={(e) => handleAddressChange(e, 'farmerAddress')} />
                        <input type="text" name="city" placeholder="City" value={addresses.farmerAddress.city} onChange={(e) => handleAddressChange(e, 'farmerAddress')} />
                        <select name="province" value={addresses.farmerAddress.province} onChange={(e) => handleAddressChange(e, 'farmerAddress')}>
                          <option value="">Select Province</option>
                          {renderProvinceOptions()}
                        </select>
                        <input type="text" name="zipCode" placeholder="Zip Code" value={addresses.farmerAddress.zipCode} onChange={(e) => handleAddressChange(e, 'farmerAddress')} />
                      </div>

                      <div className="form-group">
                        <label>Same as Farm Location?</label>
                        <div className="radio-options">
                          <input type="radio" id="sameAddress" name="sameAddress" value="yes" checked={sameAddress} onChange={handleSameAddressChange} />
                          <label htmlFor="yes">Yes</label>
                          <input type="radio" id="sameAddress" name="sameAddress" value="no" checked={!sameAddress} onChange={handleSameAddressChange} />
                          <label htmlFor="no">No</label>
                        </div>
                      </div>

                      {!sameAddress && (
                        <div className="form-group">
                          <label>Farm Location Address:</label>
                          <input type="text" name="street" placeholder="Street" value={addresses.farmLocationAddress.street} onChange={(e) => handleAddressChange(e, 'farmLocationAddress')} />
                          <input type="text" name="city" placeholder="City" value={addresses.farmLocationAddress.city} onChange={(e) => handleAddressChange(e, 'farmLocationAddress')} />
                          <select name="province" value={addresses.farmLocationAddress.province} onChange={(e) => handleAddressChange(e, 'farmLocationAddress')}>
                            <option value="">Select Province</option>
                            {renderProvinceOptions()}
                          </select>
                          <input type="text" name="zipCode" placeholder="Zip Code" value={addresses.farmLocationAddress.zipCode} onChange={(e) => handleAddressChange(e, 'farmLocationAddress')} />
                        </div>
                      )}
                    </>
                  )}

                  {userType === 'Customer' && (
                    <>
                      <div className="form-group">
                        <label>Customer Name:</label>
                        <input type="text" name="customerName" value={customerName} onChange={handleChange} />
                      </div>

                      <div className="form-group">
                        <label>Interested to Buy:</label>
                        <textarea rows="4" name="interestToBuy" placeholder="Anything you are interested to buy" onChange={handleChange} />
                      </div>

                      <div className="form-group">
                        <label>Shipping Address:</label>
                        <input type="text" name="street" placeholder="Street" value={addresses.shippingAddress.street} onChange={(e) => handleAddressChange(e, 'shippingAddress')} />
                        <input type="text" name="city" placeholder="City" value={addresses.shippingAddress.city} onChange={(e) => handleAddressChange(e, 'shippingAddress')} />
                        <select name="province" value={addresses.shippingAddress.province} onChange={(e) => handleAddressChange(e, 'shippingAddress')}>
                          <option value="">Select Province</option>
                          {renderProvinceOptions()}
                        </select>
                        <input type="text" name="zipCode" placeholder="Zip Code" value={addresses.shippingAddress.zipCode} onChange={(e) => handleAddressChange(e, 'shippingAddress')} />
                      </div>
                    </>
                  )}

                  {userType === 'Worker' && (
                    <>
                      <div className="form-group">
                        <label>Worker Name:</label>
                        <input type="text" name="workerName" value={workerName} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Skills:</label>
                        <textarea rows="4" name="skills" value={skills} onChange={handleChange} />
                      </div>
                    </>
                  )}

                  {userType === 'Worker' && (
                    <div className="form-group">
                      <label>Communication Address:</label>
                      <input type="text" name="street" placeholder="Street" value={addresses.communicationAddress.street} onChange={(e) => handleAddressChange(e, 'communicationAddress')} />
                      <input type="text" name="city" placeholder="City" value={addresses.communicationAddress.city} onChange={(e) => handleAddressChange(e, 'communicationAddress')} />
                      <select name="province" value={addresses.communicationAddress.province} onChange={(e) => handleAddressChange(e, 'communicationAddress')}>
                        <option value="">Select Province</option>
                        {renderProvinceOptions()}
                      </select>
                      <input type="text" name="zipCode" placeholder="Zip Code" value={addresses.communicationAddress.zipCode} onChange={(e) => handleAddressChange(e, 'communicationAddress')} />
                    </div>
                  )}
                </div>
              </div>

              <div className="button-container">
                <button type="submit">Register</button>
                <button type="button" onClick={goBackToUserTypeSelection}>Go Back</button>
              </div>

              {error && <p className="error">{error}</p>}
            </form>
          </div>
        )}
      </div>
      <p className="bottomnote">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      <Footer />
    </div>
  );
};

export default Register; 