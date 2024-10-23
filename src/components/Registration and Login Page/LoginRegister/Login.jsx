import React, { useState } from 'react';
import { FaUserCircle, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../../utlis/constant';
import Cookies from 'js-cookie'; // Import js-cookie

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      
      const url = serverUrl + 'users/login';
      const body = { username, password };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to log in. Please try again later.');
      }

      const data = await response.json();
      Cookies.set('token', data.token, { expires: 5 }); // Expires in 1 day
      Cookies.set('userId', data.userId, { expires: 5}); // Expires in 1 day

      console.log('Login successful:', data);
      setRole(data.user.role);

      // Check user role and redirect accordingly
      setTimeout(() => {
        if (role === 'buyer') {
          navigate('/BuyerDashboard');
        } else if (role === 'seller') {
          navigate('/SellerDashboard');
        }  else if (role === 'admin') {
          navigate('/admin');
        } else  {
          setError(' ');
        }
      }, );
    } catch (error) {
      console.error('Login Error:', error);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmits = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = serverUrl + 'admin/login'; // Ensure this URL points to the correct admin login endpoint
      const body = { username, password };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to log in. Please try again later.');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Navigate to Admin Dashboard
      navigate('/Admindashboard'); // Redirect admin to their dashboard

    } catch (error) {
      console.error('Login Error:', error);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-login-container">
      <div className="form-wrapper">
        <h1>Login to Your Account</h1>
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
            <FaLock className="icon" />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : 'Login'}
          </button>
        </form>
        <p>
          Don't have an account? <a href="/RegistrationLogin">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;