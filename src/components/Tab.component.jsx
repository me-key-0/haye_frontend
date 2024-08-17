import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPlacesRequest } from '../redux/Slices/placesSlice'; 
import { setAllPlaces } from '../redux/Slices/placesSlice'; 
import Item from './CardItem.component'; 


const Tab = () => {
  const [activeTab, setActiveTab] = useState('All'); // Set default tab to 'All'
  const dispatch = useDispatch();
  const allPlaces = useSelector((state) => state.places.allPlaces); // Replace with your actual state selector

  useEffect(() => {
    // Fetch all places when the component mounts
    const loadAllPlaces = async () => {
      try {
        const places = await fetchAllPlacesRequest();
        dispatch(setAllPlaces(places)); // Dispatch the action to update Redux state
      } catch (error) {
        console.error('Error loading all places:', error);
      }
    };

    loadAllPlaces();
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filterPlaces = (category) => {
    if (category === 'All') {
      return allPlaces;
    }
    return allPlaces.filter(place => place.category === category);
  };

  return (
    <div>
      <div className="w-3/4 mx-auto text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {['All', 'Hotels', 'Restaurants', 'Cafes', 'Lounges'].map((tab) => (
            <li key={tab} className="me-2">
              <button
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                  activeTab === tab
                    ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                    : ''
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {['All', 'Hotels', 'Restaurants', 'Cafes', 'Lounges'].map((category) => (
          activeTab === category && (
            <div key={category}>
              <h2 className="w-3/4 mx-auto text-xl font-semibold">{category}</h2>
              <div className="w-3/4 mx-auto">
                {filterPlaces(category).length > 0 ? (
                  filterPlaces(category).map((place) => (
                    <Item
                      key={place._id}
                      title={place.name}
                      rating={place.rating}
                      priceRange={place.priceRange}
                      imageSrc={place.image}
                      category={place.category}
                    />
                  ))
                ) : (
                  <p>No places available.</p>
                )}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Tab;
