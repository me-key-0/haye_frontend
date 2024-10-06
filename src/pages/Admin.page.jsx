import { useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import DataList from '../components/DataList'; 
import Sidebar from '../components/SideBar';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const AdminPage = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleAddItem = (newItem, type) => {
    if (type === 'user') {
      setUsers((prevUsers) => [...prevUsers, newItem]);
    } else if (type === 'place') {
      setPlaces((prevPlaces) => [...prevPlaces, newItem]);
    } else if (type === 'event') {
      setEvents((prevEvents) => [...prevEvents, newItem]);
    }
  };

  const handleRemoveItem = (id, type) => {
    if (type === 'user') {
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
    } else if (type === 'place') {
      setPlaces((prevPlaces) => prevPlaces.filter(place => place.id !== id));
    } else if (type === 'event') {
      setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
    }
  };

  // Dummy user data for demonstration
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);
  const [places, setPlaces] = useState([
    { id: 1, name: 'Boom burger', category: 'Restaurant' },
    { id: 2, name: 'Hyatt Regency', category: 'Hotel' },
  ]);
  const [events, setEvents] = useState([
    { id: 1, name: 'The lab', date: '23/2/23' },
    { id: 2, name: 'Bermel fest', date: '12/4/24' },
  ]);

  // Dummy chart data
  const doughnutData = {
    labels: ['Users', 'Places', 'Events'],
    datasets: [
      {
        label: 'Overview Data',
        data: [300, 50, 100],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
      },
    ],
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Users Growth',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#ff6384',
        fill: false,
      },
      {
        label: 'Places Growth',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: '#36a2eb',
        fill: false,
      },
    ],
  };

  // Function to render the main content based on the active tab
  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <div>
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-2">Users</h2>
              <p className="text-xl">1,245</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-2">Places</h2>
              <p className="text-xl">84</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-2">Events</h2>
              <p className="text-xl">43</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 h-full">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 ">Data Overview</h3>
              <Doughnut data={doughnutData} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Growth Over Time</h3>
              <Line data={lineData} />
            </div>
          </div>
        </div>
      );
    } else if (activeTab === 'users') {
      return <DataList data={users} type='user' onAdd={(newItem) => handleAddItem(newItem, 'user')} onRemove={(id) => handleRemoveItem(id, 'user')} />;
    } else if (activeTab === 'places') {
      return <DataList data={places} type='place' onAdd={(newItem) => handleAddItem(newItem, 'place')} onRemove={(id) => handleRemoveItem(id, 'place')} />;
    } else if (activeTab === 'events') {
      return <DataList data={events} type='event' onAdd={(newItem) => handleAddItem(newItem, 'event')} onRemove={(id) => handleRemoveItem(id, 'event')} />;
    }
    return null; // Handle the case where no tab is active
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;
