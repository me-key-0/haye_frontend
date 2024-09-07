import  { useState } from 'react';
import Upcoming from '../components/Upcoming.component';
import EventScheduler from '../components/EventScheduler';
import eventsData from '../services/events.data';

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events] = useState(eventsData);
  

  const handleEventSelection = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className='pt-20'>
      <Upcoming onEventSelect={handleEventSelection} />
      <EventScheduler selectedEvent={events} />
    </div>
  );
};

export default EventsPage;
