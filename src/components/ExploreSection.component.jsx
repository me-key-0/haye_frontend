import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';

const ExploreSection = ({ title, items }) => {
  const Navigate = useNavigate();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleItemClick = (placeId) => {
    Navigate.push(`/places/${placeId}`);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <Carousel responsive={responsive}>
        {items.map((item) => (
          <div key={item.id} className="cursor-pointer" onClick={() => handleItemClick(item.id)}>
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
            <h4 className="mt-2 text-lg font-semibold">{item.name}</h4>
          </div>
        ))}
      </Carousel>
    </div>
  );
};



ExploreSection.propTypes = {
    title: PropTypes.string, 
    items: PropTypes.object,
    
  };


export default ExploreSection;

