import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../../utlis/constant';
import './UserManagement.css'; // Import the CSS file
const UserManagement = () => {
  const navigate = useNavigate();
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetchBuyers();
    fetchSellers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const response = await axios.get(`${serverUrl}Admin/users`);
      setBuyers(response.data);
    } catch (error) {
      console.error('Error fetching buyers:', error);
    }
  };

  const fetchSellers = async () => {
    try {
      const response = await axios.get(`${serverUrl}admin/sellers`);
      setSellers(response.data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  

 

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="user-management-container">
      <div className="back-btn" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i> Back
      </div>
      <h1>User Management</h1>

      <div className="table-container">
        <h2> </h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>phone</th>
              <th>role</th>

              
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer) => (
              <tr key={buyer.id}>
                <td>{buyer.name}</td>
                <td>{buyer.username}</td>
                <td>{buyer.phone}</td>
                <td>{buyer.role}</td>

                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <h2> </h2>
        <table>
          
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller.id}>
                <td>{seller.name}</td>
                <td>{seller.username}</td>
                <td>{seller.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;