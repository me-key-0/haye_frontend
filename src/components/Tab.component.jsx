import { useState } from 'react';
import places from '../services/places.data'; // Adjust the path according to your file structure
import Item from './CardItem.component'; // Assuming this is your item card component
import SearchBar from './SearchBar.component'; // Import the SearchBar component

const Tab = () => {
  const [activeTab, setActiveTab] = useState('All'); // Set default tab to 'All'
  const [searchQuery, setSearchQuery] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [location, setLocation] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filterPlaces = (category) => {
    let filteredPlaces = places;

    if (category !== 'All') {
      filteredPlaces = filteredPlaces.filter(place => place.category === category);
    }

    if (searchQuery) {
      filteredPlaces = filteredPlaces.filter(place =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (price) {
      // Implement price filter if applicable
      // This assumes price in `places` data matches 'low', 'medium', 'high'
      filteredPlaces = filteredPlaces.filter(place => place.priceRange === price);
    }

    if (rating) {
      filteredPlaces = filteredPlaces.filter(place => place.rating >= parseInt(rating));
    }

    if (location) {
      // Implement location filter if applicable
      // This filter assumes location is a part of place data
      filteredPlaces = filteredPlaces.filter(place => place.location.toLowerCase().includes(location.toLowerCase()));
    }

    return filteredPlaces;
  };

  return (
    <div>
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        price={price}
        setPrice={setPrice}
        rating={rating}
        setRating={setRating}
        location={location}
        setLocation={setLocation}
      />

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
                      key={place.id}
                      title={place.name}
                      rating={place.rating}
                      priceRange={place.priceRange} // Ensure this is available in your places data
                      imageSrc={place.image} // Ensure this is available in your places data
                      category={place.category} // Ensure this is available in your places data
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
