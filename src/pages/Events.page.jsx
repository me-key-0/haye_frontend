import  { useState } from 'react';
import Upcoming from '../components/Upcoming.component';
import EventScheduler from '../components/EventScheduler';

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventSelection = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
      <Upcoming onEventSelect={handleEventSelection} />
      <EventScheduler selectedEvent={selectedEvent} />
    </div>
  );
};

export default EventsPage;
