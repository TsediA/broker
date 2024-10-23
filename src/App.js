import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation here
import RegistrationLogin from './components/Registration and Login Page/RegistrationLogin';
import PropertyListing from './components/Search and Property Listing Page/PropertyListing';
import Header from './components/Header';
import Footer from './components/Footer';
import Buy from './components/Buy/buy';
import Rent from './components/Rent/rent';
import Properties from './components/Properties/propertiespage';
import HomePage from './components/Home/home';
import BuyerWorkflow from './BuyerWorkflow/BuyerWorkflow';
import SellerWorkflow from './Sellerworkflow/sellerworkflow';
import AdminDashboard from './Admin/admin/admin';
import SellerDashboard from './Sellerworkflow/SellerDashboard';
import AddAndPostProperty from './Sellerworkflow/sellercomponnents/AddAndPostProperty';
import ViewNotifications from './Sellerworkflow/sellercomponnents/ViewNotifications';
import HandleResponseRequest from './Sellerworkflow/sellercomponnents/handleResponseRequest';
import ReceivePayment from './Sellerworkflow/sellercomponnents/ReceivePayment';
import CommunicateSeller from './BuyerWorkflow/buyercomponents/CommunicateSeller';
import Notification from './BuyerWorkflow/buyercomponents/Notification';
import SearchProperties from './BuyerWorkflow/buyercomponents/Search Properties';
import BuyerDashboard from './BuyerWorkflow/buyerdashboard';
import ProfilePage from './BuyerWorkflow/buyercomponents/Myprofile';
import Getrequest from './Admin/admincomponents/Getrequest';
import NegotiationsManagement from './Admin/admincomponents/NegotiationsManagement';
import MatchesManagement from './Admin/admincomponents/MatchesManagement';
import Admindashboard from './Admin/admin/admindashboard';
import Login from './components/Registration and Login Page/LoginRegister/Login';
import ProfilePages from './Sellerworkflow/sellercomponnents/myprofiless';
import PaymentMethod from './Sellerworkflow/sellercomponnents/myprofiles/PaymentMethodsCard';
import BuyerInformationCard from './Sellerworkflow/sellercomponnents/myprofiles/BuyerInformationCard';
import Payment from './BuyerWorkflow/buyercomponents/myprofiless/PaymentMethodCard';
import ProfileDetailsCard from './BuyerWorkflow/buyercomponents/myprofiless/ProfileDetailsCard';
import BuyerHistoryCard from './BuyerWorkflow/buyercomponents/myprofiless/BuyerHistoryCard';
import Usermanagement from './Admin/admincomponents/ListingsManagement';
import AboutUs from './components/Aboutus';
import Rate from './components/Rate';
import AdminProfile from './Admin/admincomponents/myprofile';
import PostInformation from './Sellerworkflow/sellercomponnents/myprofiles/PostInformationCard';
import ChatRoom from './Sellerworkflow/sellercomponnents/myprofiles/ChatRoomCard';
const App = () => {
  const location = useLocation();

  // Define routes without Header and Footer
  const noHeaderFooterRoutes = [
    '/ChatRoom',
    '/admin',
    '/AdminProfile',
    '/Payment',
    '/BuyerWorkflow',
    '/SellerWorkflow',
    '/SellerDashboard',
    '/BuyerDashboard',
    '/ProfilePage',
    '/ProfilePages',
    '/PaymentMethod',
    '/ProfileDetailsCard',
    '/MatchesManagement',
    '/BuyerHistoryCard',
    '/BuyerInformationCard',
    '/AddAndPostProperty',
    '/ViewNotifications',
    '/HandleResponseRequest',
    '/ReceivePayment',
    '/ViewProperty',
    '/SearchProperties',
    '/Notification',
    '/CommunicateSeller',
    '/Usermanagement',
    '/NegotiationsManagement',
    '/Getrequest',
    '/PaperworkManagement',
    '/TransactionsManagement',
    '/Admindashboard',
    '/PostInformation'
  ];

  const shouldRenderHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {shouldRenderHeaderFooter && <Header />}
      <Routes>
        {/* Routes with Header and Footer */}
        <Route path="/Login" element={<Login />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Rate" element={<Rate />} />
        <Route path="/property-listing" element={<PropertyListing />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/Rent" element={<Rent />} />
        <Route path="/Properties" element={<Properties />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/RegistrationLogin" element={<RegistrationLogin />} />

        {/* Routes without Header and Footer */}
        AdminProfile
        <Route path="/AdminProfile" element={<AdminProfile />} />
        PostInformation
        <Route path="/PostInformation" element={<PostInformation />} />
        
        <Route path="/ChatRoom" element={<ChatRoom />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/BuyerWorkflow" element={<BuyerWorkflow />} />
        <Route path="/SellerWorkflow" element={<SellerWorkflow />} />
        <Route path="/SellerDashboard" element={<SellerDashboard />} />
        <Route path="/BuyerDashboard" element={<BuyerDashboard />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/ProfilePages" element={<ProfilePages />} />
        <Route path="/PaymentMethod" element={<PaymentMethod />} />
        <Route path="/ProfileDetailsCard" element={<ProfileDetailsCard />} />
        <Route path="/MatchesManagement" element={<MatchesManagement />} />
        <Route path="/BuyerHistoryCard" element={<BuyerHistoryCard />} />
        <Route path="/BuyerInformationCard" element={<BuyerInformationCard />} />
        <Route path="/AddAndPostProperty" element={<AddAndPostProperty />} />
        <Route path="/ViewNotifications" element={<ViewNotifications />} />
        <Route path="/HandleResponseRequest" element={<HandleResponseRequest />} />
        <Route path="/ReceivePayment" element={<ReceivePayment />} />
        <Route path="/SearchProperties" element={<SearchProperties />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/CommunicateSeller" element={<CommunicateSeller />} />
        <Route path="/Usermanagement" element={<Usermanagement />} />
        <Route path="/NegotiationsManagement" element={<NegotiationsManagement />} />
        <Route path="/admin/Getrequest" element={<Getrequest />} />
        <Route path="/Admindashboard" element={<Admindashboard />} />
      </Routes>
      {shouldRenderHeaderFooter && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;