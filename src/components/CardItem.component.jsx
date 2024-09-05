import PropTypes from 'prop-types';
import { CheckAuth } from '../services/auth/CheckAuth'; // Adjust the import path as needed

export function Item({ imgSrc, title, name, rating, priceRange, onMoreDetailsClick, onFavoriteClick, isFavorited }) {
  const { isAuthenticated } = CheckAuth();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-4 w-4 ${i <= rating ? "text-yellow-300" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  const handleMoreDetailsClick = () => {
    if (isAuthenticated) {
      onMoreDetailsClick();
    } else {
      // Handle unauthenticated case, e.g., show a login prompt
      alert('Please sign in to view more details.');
    }
  };

  const handleFavoriteClick = () => {
    if (isAuthenticated) {
      onFavoriteClick();
    } else {
      // Handle unauthenticated case, e.g., show a login prompt
      alert('Please sign in to add to favorites.');
    }
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden m-2">
      <div className="relative w-full h-40">
        <img src={imgSrc} alt={title} className="object-cover h-full w-full" />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <svg
            className={`h-5 w-5 ${isFavorited ? 'text-red-500' : 'text-gray-500'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.828a4 4 0 010-5.657z" />
          </svg>
        </button>
      </div>
      <div className="p-3 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-gray-900">{name}</h3>
          
          <div className="mb-2 mt-2 flex items-center">
            {renderStars(rating)}
            <span className="ml-2 rounded bg-cyan-100 px-1 py-0.5 text-xs font-semibold text-cyan-800">
              {rating}.0
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm font-bold text-gray-900">Price: {priceRange}</span>
          <button
            onClick={handleMoreDetailsClick}
            className="rounded-lg bg-cyan-700 px-2 py-1 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  priceRange: PropTypes.string.isRequired,
  onMoreDetailsClick: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  isFavorited: PropTypes.bool,
};

Item.defaultProps = {
  isFavorited: false,
};

export default Item;
 