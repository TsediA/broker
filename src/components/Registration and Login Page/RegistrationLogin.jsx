import React, { useState } from 'react';
import './RegistrationLogin.css';
import { FaUserCircle, FaPhone, FaUserTag, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../../utlis/constant';
import Cookies from 'js-cookie'; // Import js-cookie

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // Default role
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    let phoneNumber = input.replace(/\D/g, '');
    if (phoneNumber.length === 9) {
      phoneNumber = `+251${phoneNumber}`; // Ensure the format is correct
    }
    setPhone(phoneNumber);
  };

  const validateInputs = () => {
    if (!username.trim() || !password.trim() || !name.trim()) {
      return 'Please fill in all the required fields.';
    }
    if (phone.length !== 13 || !phone.startsWith('+251')) {
      return 'Phone number must be 13 digits long and start with +251.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = `${serverUrl}users/register`; // Adjust the URL as needed
      const body = { username, name, password, role, phone };
      const response = await axios.post(url, body);

      // Set cookies using js-cookie
      Cookies.set('token', response.data.token, { expires: 1 }); // Expires in 1 day
      Cookies.set('userId', response.data.userId, { expires: 1 }); // Expires in 1 day

      setError('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000);
      
    } catch (error) {
      console.error('Submission Error:', error);
      setError(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-login-container">
      <div className="form-wrapper">
        <h1>Create an Account</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-group">
            <FaUserCircle className="icon" />
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaUserCircle className="icon" />
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="toggle-password-visibility" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="input-group">
            <FaPhone className="icon" />
            <input
              type="tel"
              value={phone}
              placeholder="Phone"
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div className="input-group">
            <FaUserTag className="icon" />
            <select
              value={role}
              className="select-role"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : 'Register'}
          </button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;