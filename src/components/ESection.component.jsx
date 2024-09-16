import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';

const ESection = ({ title, items, type }) => {
  const navigate = useNavigate();
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const handleItemClick = (itemId) => {
    if (type === 'place') {
      navigate(`/places/${itemId}`);
    } else if (type === 'event') {
      navigate(`/events/${itemId}`);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <Carousel
        swipeable={true} 
        draggable={true} 
        showDots={false}  
        responsive={responsive}
        ssr={true}  
        infinite={true}  
        autoPlay={true}
        autoPlaySpeed={3000}  
        keyBoardControl={true} 
        customTransition="transform 1000ms ease-in-out"  
        transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}  
        dotListClass="custom-dot-list-style"
        itemClass="px-4"
      >
        {items.map((item) => (
          <div
            key={item.name}
            className="cursor-pointer rounded-lg overflow-hidden"
            onClick={() => handleItemClick(item.name)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h4 className="mt-2 text-lg font-semibold">{item.name}</h4>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

ESection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  type: PropTypes.oneOf(['place', 'event']).isRequired, 
};

export default ESection;
