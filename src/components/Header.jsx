import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearchLocation, FaMoneyBillAlt, FaUserCircle, FaUserTie, FaUserCog } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>House Broker Website </h1>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/Homepage" className="nav-link home">
              <FaHome className="nav-icon" />
              <span className="nav-text">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/buy" className="nav-link buy">
              <FaSearchLocation className="nav-icon" />
              <span className="nav-text">Buy</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/rent" className="nav-link rent">
              <FaSearchLocation className="nav-icon" />
              <span className="nav-text">Rent</span>
            </Link>
          </li>
         
          <li className="nav-item">
            <Link to="/RegistrationLogin" className="nav-link RegistrationLogin">
              <FaUserCircle className="nav-icon" />
              <span className="nav-text">Signin/Register</span>
            </Link>
         
         
          </li>
         
          <li className="nav-item">
            <Link to="/AboutUs" className="nav-link Register">
              <FaUserCircle className="nav-icon" />
              <span className="nav-text">AboutUs</span>
            </Link>
          </li>
          
         
        </ul>
      </nav>
    </header>
  );
};

export default Header;