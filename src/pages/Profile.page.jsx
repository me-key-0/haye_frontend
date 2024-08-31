import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScheduledEventsStart,updateUserProfileStart, fetchUserProfileStart, fetchUserFavoritesStart } from '../redux/Slices/userSlice';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);
  const userProfile = useSelector(state => state.user.profile);
  const userFavorites = useSelector(state => state.user.favorites);
  const userEvents = useSelector(state => state.user.scheduledEvents);
  const status = useSelector(state => state.user.status);
  const error = useSelector(state => state.user.error);

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserProfileStart(currentUser.id));
      dispatch(fetchUserFavoritesStart(currentUser.id));
      dispatch(fetchScheduledEventsStart(currentUser.id));
    }
  }, [currentUser, dispatch]);

  const handleUpdate = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    dispatch(updateUserProfileStart({ name, email, password }));
    alert('Profile updated successfully');
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!currentUser) {
    return <p>Please sign in to view your profile.</p>;
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        Profile Dashboard
      </Typography>

      {/* Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold">Your Profile</h2>
        <div className="mt-4">
          <p><strong>Name:</strong> {userProfile?.name}</p>
          <p><strong>Email:</strong> {userProfile?.email}</p>
          <p><strong>Joined:</strong> {new Date(userProfile?.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold">Your Favorites</h2>
        {/*userFavorites?.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {userFavorites.map((place) => (
              <li key={place.id} className="bg-gray-100 p-4 rounded-md">
                <Link to={`/places/${place.id}`} className="text-lg font-semibold text-blue-600">
                  {place.name}
                </Link>
                <p className="text-gray-600">{place.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">You havent added any favorites yet.</p>
        )*/}
      </div>

      {/* Scheduled Events Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold">Your Events</h2>
        {/*userEvents?.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {userEvents.map((place) => (
              <li key={place.id} className="bg-gray-100 p-4 rounded-md">
                <Link to={`/places/${place.id}`} className="text-lg font-semibold text-blue-600">
                  {place.name}
                </Link>
                <p className="text-gray-600">{place.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">You havent added any Events yet.</p>
        )*/}
      </div>
      

      {/* Settings Section with Accordion */}
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleAccordionChange('panel1')}
        className="mt-6"
      >
        <AccordionSummary
          //expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>Manage Account</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-4">
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="New Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update Profile
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>

      
    </div>
  );
};

export default Profile;
