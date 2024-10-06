import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton.component';
import FormInput from '../components/FormInput.component';
import { scheduleEventStart } from '../redux/Slices/eventsSlice';

const EventScheduler = ({ selectedEvent }) => {
  const [scheduleDate, setScheduleDate] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedEvent) {
      setScheduleDate(selectedEvent.date); // Pre-fill the form with selected event date
    }
  }, [selectedEvent]);

  const handleScheduleDateChange = (e) => {
    setScheduleDate(e.target.value);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEvent || !scheduleDate) return;

    const payload = {
      name: selectedEvent.name,
      date: scheduleDate,
      email: currentUser.user.email,
    };

    dispatch(scheduleEventStart(payload));
    setSuccessMessage(true);
  };

  return (
    <div id="event-scheduler" className="mt-8">
      <h3 className="text-xl font-bold mb-4">Event Scheduler</h3>

      {selectedEvent && (
        <>
          <p className="text-lg font-semibold">Scheduling for: {selectedEvent.name}</p>
          <div className="mt-4">
            <FormInput
              type="date"
              id="schedule-date"
              name="Schedule Date"
              placeholder="Select Date"
              value={scheduleDate}
              onChange={handleScheduleDateChange}
              required
            />
            <div className="mt-4">
              {!successMessage ? (
                <CustomButton onClick={handleScheduleSubmit} className="bg-blue-500 hover:bg-blue-600">
                  Schedule Event
                </CustomButton>
              ) : (
                <p className="text-green-500 text-lg">Successfully scheduled!</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

EventScheduler.propTypes = {
  selectedEvent: PropTypes.object,
};

export default EventScheduler;
