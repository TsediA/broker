import { Link } from 'react-router-dom';
import './BuyerHome.css';

const BuyerHome = () => {
  return (
    <div className="buyer-home-container">
      <h1 className="buyer-home-title">Welcome to the Buyer's Dashboard</h1>
      <div className="buyer-home-cards-container">
        

        <div className="buyer-home-card">
          <Link to="/SearchProperties" className="buyer-home-card-link">
            <div className="buyer-home-card-content">
              <i className="fas fa-search buyer-home-card-icon"></i>
              <h3 className="buyer-home-card-title">Search Properties</h3>
              <p className="buyer-home-card-description">Find the perfect property for you.</p>
            </div>
          </Link>
        </div>
        <div className="buyer-home-card">
          <Link to="/ProfilePage" className="buyer-home-card-link">
            <div className="buyer-home-card-content">
              <i className="fas fa-user-circle buyer-home-card-icon"></i>
              <h3 className="buyer-home-card-title">My Profile</h3>
              <p className="buyer-home-card-description">View and manage your profile.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;