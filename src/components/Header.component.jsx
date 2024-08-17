
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; 
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { signOutStart } from '../redux/Slices/userSlice';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);

    const isActive = (path) => currentPath === path ? 'text-blue-600 font-semibold' : '';

    const handleSignOut = () => {
        
            dispatch(signOutStart({ currentUser }));
        
    };

    return (
        <div>
            {/* Header with Logo and Sign-In Button */}
            <header className="bg-[#FCF8F1] shadow-md fixed top-0 left-0 w-full z-50 flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
                <Link to="/">
                    <img
                        src="assets/Haye_light.png"
                        alt="Logo"
                        className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-150"
                    />
                </Link>
                <nav className="flex">
                    <ul className="flex gap-8">
                        <li>
                            <Link
                                to="/explore"
                                className={`text-base transition-all duration-200 hover:text-opacity-80 ${isActive('/explore')}`}
                            >
                                Explore
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/events"
                                className={`text-base transition-all duration-200 hover:text-opacity-80 ${isActive('/events')}`}
                            >
                                Events
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/places"
                                className={`text-base transition-all duration-200 hover:text-opacity-80 ${isActive('/places')}`}
                            >
                                Places
                            </Link>
                        </li>
                        <li>
                            <HashLink
                                to="/#about"
                                className={`text-base transition-all duration-200 hover:text-opacity-80 ${isActive('/#about')}`}
                            >
                                About
                            </HashLink>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={`text-base transition-all duration-200 hover:text-opacity-80 ${isActive('/contact')}`}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
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
            </header>
        </div>
    );
};

Header.propTypes = {
    currentUser: PropTypes.object,
};

export default Header;
