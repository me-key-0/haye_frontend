import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import Explore from './pages/Explore.page';
import Events from './pages/Events.page';
import Places from './pages/Places.page';
import PlaceDetailsPage from './pages/PlaceDetails.page'; 
import SignIn from './pages/SignIn.page';
import SignUp from './pages/SignUp.page';
import OtpPage from './pages/OTP.page';
import Header from './components/Header.component';
import ContactUs from './pages/ContactUs.page';
import Profile from './pages/Profile.page';
//import PrivateRoute from './components/PrivateRoute.component';

import AdminDashboard from './pages/Admin.page';


const App = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Router>
      <Header />
      <Routes>
       <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/events" element={<Events />} />
        <Route path="/places" element={<Places />} />
        <Route path="/places/:id" element={<PlaceDetailsPage />} />
        <Route 
          path="/signin" 
          element={currentUser ? <Navigate to="/" /> : <SignIn />} 
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="signup/otp" element={<OtpPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />}/>
      </Routes>
    </Router>
  );
};

export default App;
