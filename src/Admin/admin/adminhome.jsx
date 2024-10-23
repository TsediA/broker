// AdminHome.js
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleCardClick = (section) => {
    navigate(`/admin/${section}`);
  };

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
            <i className="fas fa-user-circle seller-home-card-icon"></i>
            <h2 className="card-title">Profile</h2>
            <p className="card-description">Connect buyers and sellers based on their preferences.</p>
          </Link>
        </div> 

        <div className="dashboard-card" id="inspections" onClick={() => handleCardClick('GetRequest')}>
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

export default AdminHome;