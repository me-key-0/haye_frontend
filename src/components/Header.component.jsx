import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserFavoritesStart,
  fetchScheduledEventsStart,
  fetchUserProfileStart,
  setCurrentUser,
  removeFavorite,
  
} from '../redux/Slices/userSlice';
import { removePlaceFromFavorite } from '../redux/Slices/placesSlice';
import { signOutStart } from '../redux/Slices/authSlice';
import { FaHeart, FaCalendarAlt, FaUser, FaTimes } from 'react-icons/fa';

const Header = React.memo(() => {
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const signOutStatus = useSelector((state) => state.auth.status);
  const scheduledEvents = useSelector((state) => state.user.scheduledEvents); 
  const favorites = useSelector((state) => state.user.favorites); 

  const [isFavoritesPopupVisible, setFavoritesPopupVisible] = useState(false);
  const [isEventsPopupVisible, setEventsPopupVisible] = useState(false);

  const favoritesRef = useRef(null);
  const eventsRef = useRef(null);

  const isActive = (path) =>
    currentPath === path ? 'text-blue-600 font-semibold' : '';

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
    dispatch(signOutStart({ currentUser }));
  };

  const handleFetchFavorites = useCallback(() => {
    dispatch(fetchUserFavoritesStart());
  }, [dispatch]);

  const handleFetchScheduledEvents = useCallback(() => {
    dispatch(fetchScheduledEventsStart());
  }, [dispatch]);

  const handleFetchUserProfile = useCallback(() => {
    if (currentUser) {
      dispatch(fetchUserProfileStart(currentUser.id));
    }
  }, [dispatch, currentUser]);

  const toggleFavoritesPopup = () => {
    setFavoritesPopupVisible(!isFavoritesPopupVisible);
    setEventsPopupVisible(false);
  };

  const toggleEventsPopup = () => {
    setEventsPopupVisible(!isEventsPopupVisible);
    setFavoritesPopupVisible(false);
  };

  const handleClickOutside = (event) => {
    if (
      favoritesRef.current &&
      !favoritesRef.current.contains(event.target) &&
      eventsRef.current &&
      !eventsRef.current.contains(event.target)
    ) {
      setFavoritesPopupVisible(false);
      setEventsPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (currentUser) {

    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      dispatch(setCurrentUser({ token, user }));
    }
      //handleFetchFavorites();
      //handleFetchScheduledEvents();
    }
  }, [
    signOutStatus,
    navigate,
    currentUser,
    handleFetchFavorites,
    handleFetchScheduledEvents,
    dispatch,
  ]);

  // Handler for Profile button click
  const handleProfileClick = () => {
    handleFetchUserProfile();
    navigate('/profile');
  };

  // Remove favorite handler
  const handleRemoveFavorite = (placeId) => {
    dispatch(removeFavorite(placeId));
    dispatch(removePlaceFromFavorite(placeId));
  };

  return (
    <header className="bg-[#FCF8F1] shadow-md fixed top-0 left-0 w-full z-50 flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
      <Link to="/">
        <img
          src="/assets/Haye_light.png"
          alt="Logo"
          className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-150"
        />
      </Link>
      <nav className="flex flex-grow">
        <ul className="flex gap-8 flex-grow justify-center">
          <li>
            <Link
              to="/explore"
              className={`text-base transition-all duration-200 hover:text-opacity-80 ${isActive(
                '/explore'
              )}`}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              className={`text-base transition-all duration-200 hover:text-opacity-80 ${isActive(
                '/events'
              )}`}
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/places"
              className={`text-base transition-all duration-200 hover:text-opacity-80 ${isActive(
                '/places'
              )}`}
            >
              Places
            </Link>
          </li>
          <li>
            <HashLink
              to="/#about"
              className={`text-base transition-all duration-200 hover:text-opacity-80 ${isActive(
                '/#about'
              )}`}
            >
              About
            </HashLink>
          </li>
          <li>
            <Link
              to="/contact"
              className={`text-base transition-all duration-200 hover:text-opacity-80 ${isActive(
                '/contact'
              )}`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        {currentUser && (
          <>
            <div className="relative" ref={eventsRef}>
              <button onClick={toggleEventsPopup} className="relative">
                <FaCalendarAlt size={24} />
                {scheduledEvents.length > 0 && (
                  <span className="absolute bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5 -top-1 -right-1">
                    {scheduledEvents.length}
                  </span>
                )}
              </button>
              {isEventsPopupVisible && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg p-4 rounded-lg z-50">
                  <h3 className="font-semibold mb-2">Scheduled Events</h3>
                  <ul className="space-y-2">
                    {scheduledEvents.length > 0 ? (
                      scheduledEvents.map((event, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          {event.name}
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-700">
                        No events scheduled
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative" ref={favoritesRef}>
              <button onClick={toggleFavoritesPopup} className="relative">
                <FaHeart size={24} />
                {console.log(favorites)}
                {favorites.length > 0 && (
                  <span className="absolute bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5 -top-1 -right-1">
                    {favorites.length}
                  </span>
                )}
              </button>
              {isFavoritesPopupVisible && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg p-4 rounded-lg z-50">
                  <h3 className="font-semibold mb-2">Favorites</h3>
                  <ul className="space-y-2">
                    {favorites.length > 0 ? (
                      favorites.map((favorite) => (
                        <li key={favorite.id} className="flex justify-between items-center text-sm text-black-700">
                          <span>{favorite.title}</span>
                          <button
                            onClick={() => handleRemoveFavorite(favorite.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-700">
                        No favorites yet
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile Button */}
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="relative focus:outline-none"
              >
                <FaUser size={24} />
              </button>
            </div>
          </>
        )}
        {currentUser ? (
          <button
            onClick={handleSignOut}
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
          >
            Sign out
          </button>
        ) : (
          <Link
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
            to="/signin"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
