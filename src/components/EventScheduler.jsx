import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton.component';
import FormInput from '../components/FormInput.component';

const EventScheduler = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleLocation, setScheduleLocation] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleEventChange = (e) => {
    const event = events.find(event => event.id === e.target.value);
    setSelectedEvent(event);
  };

  const handleScheduleDateChange = (e) => {
    setScheduleDate(e.target.value);
  };

  const handleScheduleLocationChange = (e) => {
    setScheduleLocation(e.target.value);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Scheduled:', {
      event: selectedEvent,
      date: scheduleDate,
      location: scheduleLocation
    });
  };

  if (!isAuthenticated) {
    return <p>Please sign in to schedule events.</p>;
  }

  return (
    <div id="event-scheduler" className="mt-8">
      <h3 className="text-xl font-bold mb-4">Event Scheduler</h3>
      
      <div className="mb-6">
        <label htmlFor="event-select" className="block text-base font-medium text-gray-900 mb-2">Select Event</label>
        <select
          id="event-select"
          onChange={handleEventChange}
          className="block w-full p-2 text-black border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600"
        >
          <option value="">--Select an Event--</option>
          {(events || []).map(event => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>
      </div>
      
      {selectedEvent ? (
        <div>
          <p className="text-lg font-semibold">Scheduling for: {selectedEvent.name}</p>
          <div className="mt-4">
            <FormInput
              type="date"
              id="schedule-date"
              name="scheduleDate"
              placeholder="Select Date"
              value={scheduleDate}
              onChange={handleScheduleDateChange}
              required
            />
            <FormInput
              type="text"
              id="schedule-location"
              name="scheduleLocation"
              placeholder="Enter Location"
              value={scheduleLocation}
              onChange={handleScheduleLocationChange}
              required
            />
            <div className="mt-4">
              <CustomButton onClick={handleScheduleSubmit} className="bg-blue-500 hover:bg-blue-600">
                Schedule Event
              </CustomButton>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4">Please select an event to schedule.</p>
      )}
    </div>
  );
};

EventScheduler.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      image: PropTypes.string
    })
  ).isRequired
};

export default EventScheduler;
