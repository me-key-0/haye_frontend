import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
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
import AdminDashboard from './pages/Admin.page';

const MainApp = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const location = useLocation();

  // Conditionally render Header only on non-admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Render Header only if it's not the admin route */}
      {!isAdminRoute && <Header />}

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
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <MainApp />
  </Router>
);

export default App;
