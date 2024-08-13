import React from 'react';
import events from '../services/events.data';

class TrendingPlaces extends React.Component {
    constructor(props){
        super(props);
    this.state = {
        events : events
    };
    }
    

render() {
  return (
    <div>
        <h3 className="text-xl font-bold mb-4" >Upcoming Events</h3>
        {events.map(event => (
          <div key={event.id}>{event.name}</div>
        ))}
      </div>
  );
}
}
export default TrendingPlaces;



