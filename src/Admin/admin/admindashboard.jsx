import AdminHome from "./adminhome";
import { useNavigate } from 'react-router-dom';

const Admindashboard = () =>{
    const navigate = useNavigate(); // Get the navigate function

    const handleGoBack = () => {
        navigate(-1);
    };
    return(
        <div className="admincomponents">
            <div className="back-btn" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </div>
     <AdminHome/>
        </div>
        
    );

};
export default Admindashboard;