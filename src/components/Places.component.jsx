import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import places from '../services/places.data';
import Item from './CardItem.component';
import SearchBar from './SearchBar.component';
import { addPlaceToFavorite, removePlaceFromFavorite} from '../redux/Slices/placesSlice';
import { addFavorite, removeFavorite } from '../redux/Slices/userSlice';

const Places = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [location, setLocation] = useState('');

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const favorites = useSelector((state) => state.user.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const place = useSelector((state) => state.places.place);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFavoriteClick = () => {
    if (favorites.find(fav => fav.id === place.id)) {
      dispatch(removePlaceFromFavorite(place.id));
      dispatch(removeFavorite(place.id));
    } else {
      dispatch(addPlaceToFavorite(place.id));
      dispatch(addFavorite({ id: place.id, ...place }));
    }
  };

  const filteredPlaces = useMemo(() => {
    let filteredPlaces = places;

    if (activeTab !== 'All') {
      filteredPlaces = filteredPlaces.filter(place => place.category === activeTab);
    }

    if (searchQuery) {
      filteredPlaces = filteredPlaces.filter(place =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (price) {
      filteredPlaces = filteredPlaces.filter(place => place.priceRange === price);
    }

    if (rating) {
      filteredPlaces = filteredPlaces.filter(place => place.rating >= parseInt(rating, 10));
    }

    if (location) {
      filteredPlaces = filteredPlaces.filter(place => place.location.toLowerCase().includes(location.toLowerCase()));
    }

    return filteredPlaces;
  }, [activeTab, searchQuery, price, rating, location]);

  const handleMoreDetailsClick = (place) => {
    navigate(`/places/${place.id}`);

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

      <div className="mt-4">
        {['All', 'Hotels', 'Restaurants', 'Cafes', 'Lounges'].map((category) => (
          activeTab === category && (
            <div key={category}>
              <h2 className="w-3/4 mx-auto text-xl font-semibold">{category}</h2>
              <div className="w-3/4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {filteredPlaces.map((place) => (
                  <Item
                    key={place.id}
                    imgSrc={place.imgSrc}
                    title={place.title}
                    name={place.name}
                    rating={place.rating}
                    priceRange={place.priceRange}
                    onMoreDetailsClick={() => handleMoreDetailsClick(place.id)}
                    onFavoriteClick={() => handleFavoriteClick(place.id)}
                    isFavorited={favorites.some((fav) => fav.id === place.id)}
                    isAuthenticated={isAuthenticated}
                  />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Places;
