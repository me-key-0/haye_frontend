
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HomePage from './pages/HomePage';
import Explore from './pages/Explore.page';
import Events from './pages/Events.page';
import Places from './pages/Places.page';
import SignIn from './pages/SignIn.page';
import SignUp from './pages/SignUp.page';
import Header from './components/Header.component';
import { setCurrentUser } from "./redux/user/user.actions";
import ContactUs from './pages/ContactUs.page';

const App = ({ currentUser}) => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/events" element={<Events />} />
        <Route path="/places" element={<Places />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/signin" 
          element={currentUser ? <Navigate to="/" /> : <SignIn />} 
        />
        <Route path="/contact" element={<ContactUs />} />
        {/* <Route path="/place/:id" element={<PlaceDetails places={places} />} /> */}
      </Routes>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

App.propTypes = {
  currentUser: PropTypes.object, // Assuming currentUser is an object, adjust if necessary
  setCurrentUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
