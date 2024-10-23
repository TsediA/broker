import React from 'react';
import { Link } from 'react-router-dom';
import './ProfilePages.css';
import { useNavigate } from 'react-router-dom';


const ProfilePages = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
};

  return (
    
    
    <div className="my-profile-container">
       <div className="back-btn" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </div>
      <h1 className="my-profile-title">My Profile</h1>
      <div className="my-profile-cards-container">
        

        <div className="my-profile-card">
          <Link to="/ChatRoom" className="my-profile-card-link">
            <div className="my-profile-card-content">
              <i className="fas fa-comments my-profile-card-icon"></i>
              <h3 className="my-profile-card-title">View notification</h3>
              <p className="my-profile-card-description">Communicate with potential buyers.</p>
            </div>
          </Link>
        </div>

        <div className="my-profile-card">
          <Link to="/ProfileDetailsCard" className="my-profile-card-link">
            <div className="my-profile-card-content">
              <i className="fas fa-user-circle my-profile-card-icon"></i>
              <h3 className="my-profile-card-title">Profile Details</h3>
              <p className="my-profile-card-description">View and edit your profile information.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePages;