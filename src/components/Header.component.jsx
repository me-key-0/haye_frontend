
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Header = ({ currentUser }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath === path ? 'text-blue-600 font-semibold' : '';

    return (
        <div>
            {/* Header with Logo and Sign-In Button */}
            <header className="bg-[#FCF8F1] shadow-md fixed top-0 left-0 w-full z-50 flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
                <Link to="/">
                    <img
                        src="assets/Haye_light.png"
                        alt="Logo"
                        className="w-auto h-8"
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
                            <Link
                                to="/#about"
                                className={`text-base transition-all duration-200 hover:text-opacity-80 ${isActive('#about')}`}
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
                {currentUser ? (
                    <div className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full">
                        Sign out
                    </div>
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
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

Header.propTypes = {
    currentUser: PropTypes.object
};

export default connect(mapStateToProps)(Header);
