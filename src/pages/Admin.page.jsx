import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPlacesStart,
  fetchEventsStart,
  addPlaceStart,
  updatePlaceStart,
  deletePlaceStart,
  addEventStart,
  updateEventStart,
  deleteEventStart,
} from '../redux/Slices/adminSlice'; // Assume this slice handles admin actions
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.admin.places);
  const events = useSelector((state) => state.admin.events);
  const status = useSelector((state) => state.admin.status);
  const error = useSelector((state) => state.admin.error);

  const [placeName, setPlaceName] = useState('');
  const [placeDescription, setPlaceDescription] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [expanded, setExpanded] = useState(false);

  // States for editing existing places and events
  const [editingPlaceId, setEditingPlaceId] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    dispatch(fetchPlacesStart());
    dispatch(fetchEventsStart());
  }, [dispatch]);

  const handleAddPlace = () => {
    if (editingPlaceId) {
      dispatch(updatePlaceStart({ id: editingPlaceId, name: placeName, description: placeDescription }));
      setEditingPlaceId(null);
    } else {
      dispatch(addPlaceStart({ name: placeName, description: placeDescription }));
    }
    setPlaceName('');
    setPlaceDescription('');
  };

  const handleAddEvent = () => {
    if (editingEventId) {
      dispatch(updateEventStart({ id: editingEventId, name: eventName, description: eventDescription }));
      setEditingEventId(null);
    } else {
      dispatch(addEventStart({ name: eventName, description: eventDescription }));
    }
    setEventName('');
    setEventDescription('');
  };

  const handleEditPlace = (place) => {
    setEditingPlaceId(place.id);
    setPlaceName(place.name);
    setPlaceDescription(place.description);
  };

  const handleEditEvent = (event) => {
    setEditingEventId(event.id);
    setEventName(event.name);
    setEventDescription(event.description);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (

    <div className="pt-20">

      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Places Management Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold">Manage Places</h2>
        <div className="mt-4">
          <TextField
            label="Place Name"
            variant="outlined"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            fullWidth
            className="mb-4"
          />
          <TextField
            label="Place Description"
            variant="outlined"
            value={placeDescription}
            onChange={(e) => setPlaceDescription(e.target.value)}
            fullWidth
            className="mb-4"
          />
          <Button variant="contained" color="primary" onClick={handleAddPlace}>
            {editingPlaceId ? 'Update Place' : 'Add Place'}
          </Button>
          {/* List existing places */}
          {places?.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {places.map((place) => (
                <li key={place.id} className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold">{place.name}</h3>
                  <p className="text-gray-600">{place.description}</p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditPlace(place)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => dispatch(deletePlaceStart(place.id))}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4">No places available.</p>
          )}
        </div>
      </div>

      {/* Events Management Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold">Manage Events</h2>
        <div className="mt-4">
          <TextField
            label="Event Name"
            variant="outlined"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            fullWidth
            className="mb-4"
          />
          <TextField
            label="Event Description"
            variant="outlined"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            fullWidth
            className="mb-4"
          />
          <Button variant="contained" color="primary" onClick={handleAddEvent}>
            {editingEventId ? 'Update Event' : 'Add Event'}
          </Button>
          {/* List existing events */}
          {events?.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {events.map((event) => (
                <li key={event.id} className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold">{event.name}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditEvent(event)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => dispatch(deleteEventStart(event.id))}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4">No events available.</p>
          )}
        </div>
      </div>

      {/* Settings Section with Accordion */}
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleAccordionChange('panel1')}
        className="mt-6"
      >
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>Manage Account</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-4">
            <TextField
              label="Admin Name"
              variant="outlined"
              value={placeName} // Use appropriate state for admin details
              onChange={(e) => setPlaceName(e.target.value)} // Update state as needed
            />
            <TextField
              label="Admin Email"
              variant="outlined"
              type="email"
              value={placeDescription} // Use appropriate state for admin details
              onChange={(e) => setPlaceDescription(e.target.value)} // Update state as needed
            />
            <TextField
              label="New Password"
              variant="outlined"
              type="password"
              value={eventName} // Use appropriate state for password
              onChange={(e) => setEventName(e.target.value)} // Update state as needed
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={eventDescription} // Use appropriate state for confirm password
              onChange={(e) => setEventDescription(e.target.value)} // Update state as needed
            />
            <Button variant="contained" color="primary">
              Update Admin Profile
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AdminDashboard;
