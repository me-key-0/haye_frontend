import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ searchQuery, setSearchQuery, price, setPrice, rating, setRating, type, places }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filteredPlaces = places.filter(place =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filteredPlaces);
  };

  const handleSuggestionClick = (id) => {
    navigate(`/places/${id}`);
    setSuggestions([]);
  };

  const handleDropdownToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="w-3/4 mx-auto p-4 bg-white rounded-lg">
      <div className="flex items-center relative">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch();
            }}
            className="block w-full pl-3 pr-16 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
            placeholder="Search..."
          />
          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute left-0 top-12 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              {suggestions.map((place) => (
                <div
                  key={place.id}
                  onClick={() => handleSuggestionClick(place.id)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {place.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg"
        >
          Search
        </button>

        {type === "places" && (
          <div className="relative ml-4">
            <button
              onClick={handleDropdownToggle}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg"
            >
              Filters
              <svg className="ml-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {type === "places" && filterOpen && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900">Price</h3>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full mt-1 py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
              >
                <option value="">Any</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <h3 className="mt-4 text-sm font-medium text-gray-900">Rating</h3>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="block w-full mt-1 py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
              >
                <option value="">Any</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Define PropTypes for SearchBar
SearchBar.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  price: PropTypes.string,
  setPrice: PropTypes.func,
  rating: PropTypes.string,
  setRating: PropTypes.func,
  type: PropTypes.string,
  places: PropTypes.array.isRequired,
};

export default SearchBar;
