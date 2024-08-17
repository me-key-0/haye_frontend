
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPlacesRequest } from '../redux/Slices/placesSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [location, setLocation] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSearch = () => {
    dispatch(searchPlacesRequest({ query, price, rating, location }));
  };

  return (
    <div className="w-3/4 mx-auto p-4 bg-white rounded-lg">
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-3 pr-16 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
            placeholder="Search..."
          />
        </div>

        <button
          onClick={handleSearch}
          className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg"
        >
          Search
        </button>

        <div className="relative ml-4">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg"
          >
            Filters
            <svg className="ml-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg">
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

                <h3 className="mt-4 text-sm font-medium text-gray-900">Location</h3>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full mt-1 py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
                  placeholder="Enter location"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
