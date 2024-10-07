import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Upcoming from '../components/Upcoming.component';
import EventScheduler from '../components/EventScheduler';
import { fetchAllEventsStart } from '../redux/Slices/eventsSlice';

const EventsPage = () => {
  const dispatch = useDispatch();
  // Fetch events from the Redux store
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    dispatch(fetchAllEventsStart()); // Fetch events when the component loads
  }, [dispatch]);
const events = useSelector((state) => state.events.allEvents); 
console.log(events)
  const handleEventSelection = (event) => {
    setSelectedEvent(event); // Set the selected event to pre-fill the form
  };

  return (
    <div className='pt-20'>
      <EventScheduler selectedEvent={selectedEvent} />
      <Upcoming events={events} onEventSelect={handleEventSelection} />
    </div>
  );
};

export default EventsPage;
