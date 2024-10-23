import React from 'react';
import { Link } from 'react-router-dom';

const ChatRoomCard = () => {
  return (
    <div className="my-profile-card">
      <Link to="/ChatRoomCard" className="my-profile-card-link">
        <div className="my-profile-card-content">
          <i className="fas fa-comments my-profile-card-icon"></i>
          <h3 className="my-profile-card-title">Chat Room</h3>
          <p className="my-profile-card-description">Communicate with potential buyers.</p>
        </div>
      </Link>
    </div>
  );
};

export default ChatRoomCard;