// SellerDashboard.js
import { Link } from 'react-router-dom';
import Home from './sellerHome';
import { useNavigate } from 'react-router-dom';

//import './Sellerhome.css'
const SellerDashboard = () => {
  const navigate = useNavigate(); 
  const handleGoBack = () => {
    navigate(-1);
};// Get the navigate function

  return (
    
    <div className="sellercomponnents">
       <div className="back-btn" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </div>
      <Home />
    </div>
  );
};

export default SellerDashboard;