import React, {  } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card" >
          <Link to="/UserManagement" className="card-link">
            <i className="fas fa-list-alt"></i>
            <h2 className="card-title">User management</h2>
            <p className="card-description">View and manage all property listings.</p>
          </Link>
        </div>

        <div className="dashboard-card" >
          <Link to="/MatchesManagement" className="card-link">
            <i className="fas fa-handshake"></i>
            <h2 className="card-title">Property Managements</h2>
            <p className="card-description">Connect buyers and sellers based on their preferences.</p>
          </Link>
        </div>
        <div className="dashboard-card" >
          <Link to="/AdminProfile" className="card-link">
            <i className="fas fa-handshake"></i>
            <h2 className="card-title">profiles</h2>
            <p className="card-description">Connect buyers and sellers based on their preferences.</p>
          </Link>
        </div> 

        <div className="dashboard-card" >
          <Link to="GetRequest" className="card-link">
            <i className="fas fa-clipboard-check"></i>
            <h2 className="card-title">Get All requist</h2>
            <p className="card-description">Schedule and manage property inspections.</p>
          </Link>
        </div>


        
      </div>
    </div>
  );
};

export default AdminPage;