import { useState } from 'react';
import PropTypes from 'prop-types';
import ESection from './ESection.component';
import eventsData from '../services/events.data';

const Upcoming = ({ onEventSelect }) => {
  const [events] = useState(eventsData);
  

  const handleScheduleClick = (event) => {
    onEventSelect(event);
    document.getElementById('event-scheduler').scrollIntoView({ behavior: 'smooth' });
  };

  // Filter events to show only the upcoming ones
  const filteredEvents = events.filter(event => new Date(event.date) >= new Date());

  const items = filteredEvents.map(event => ({
    ...event,
    onClick: () => handleScheduleClick(event)
  }));

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
      <ESection items={items} type="event" />
    </div>
  );
};

Upcoming.propTypes = {
  onEventSelect: PropTypes.func.isRequired,
};

export default Upcoming;
