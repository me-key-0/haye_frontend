import PropTypes from 'prop-types';

const Upcoming = ({ events, onEventSelect }) => {
  const handleScheduleClick = (event) => {
    onEventSelect(event); // Pass selected event to parent component
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
      {items.map(item => (
        <div key={item.id} onClick={item.onClick} className="event-item">
          <h4>{item.name}</h4>
          <p>{item.date}</p>
        </div>
      ))}
    </div>
  );
};

Upcoming.propTypes = {
  events: PropTypes.array.isRequired,
  onEventSelect: PropTypes.func.isRequired,
};

export default Upcoming;
