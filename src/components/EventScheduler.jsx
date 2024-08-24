
import PropTypes from 'prop-types';

const EventScheduler = ({ selectedEvent }) => {
  return (
    <div id="event-scheduler" className="mt-8">
      <h3 className="text-xl font-bold mb-4">Event Scheduler</h3>
      {selectedEvent ? (
        <div>
          <p>Scheduling for: {selectedEvent.name}</p>
          <p>Date: {selectedEvent.date}</p>
          <p>Location: {selectedEvent.location}</p>
          {/* Add event scheduling form or Google Calendar integration here */}
        </div>
      ) : (
        <p>Please select an event to schedule.</p>
      )}
    </div>
  );
};

EventScheduler.propTypes = {
  selectedEvent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default EventScheduler;
