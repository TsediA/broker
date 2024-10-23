import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './ProfileDetailsCard.css'; // Import the CSS file
import axios from 'axios'; // Import axios for API requests
import { serverUrl } from '../../../utlis/constant';
import Cookies from 'js-cookie';

const ProfileDetailsCard = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    setName(userData.name || '');
    setPhone(userData.phone || '');
    setUsername(userData.username || '');
    setPassword(userData.password || '');
  }, []);

  const updateProfile = async () => {
    const userData = { name, phone, username, password };
    
    try {
      const token = Cookies.get('token'); 
      console.log("token", token);
      
      const response = await axios.put(serverUrl + 'users/update', userData
        ,{
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the headers
          },
        }
      );
      if (response.status === 200) {
        alert('Profile updated successfully!');
        localStorage.setItem('userData', JSON.stringify(userData)); // Optionally update local storage
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('userData');
    navigate('/HomePage'); // Prevent going back to the profile page
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="back-btn" onClick={handleGoBack}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <h2>Edit Profile</h2>
      </div>

      {error && <div className="error-message">{error}</div>} {/* Display error message if any */}

      <div className="form-group">
        <label htmlFor="name-input">Name:</label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone-input">Phone:</label>
        <input
          id="phone-input"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="form-group">
        <label htmlFor="username-input">Username:</label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password-input">Password:</label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      <div className="button-group">
        <button className="update-btn" onClick={updateProfile}>
          Update Profile
        </button>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDetailsCard;