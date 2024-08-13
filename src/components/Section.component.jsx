import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Section = ({ id, title, images, description, heading, linkTo }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section id={id} className="py-6 sm:py-8 lg:py-10"> 
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2> 
        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2 mb-4"> 
          <div>
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div>
            <h1 className="mt-2 text-3xl font-bold text-black lg:mt-4 sm:text-5xl xl:text-6xl"> 
              {heading}
            </h1>
            <p className="mt-2 text-base text-black lg:mt-4 sm:text-lg">
              {description}
            </p>
            <Link
              to={linkTo}
              className="inline-flex items-center px-4 py-2 mt-4 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-6 hover:bg-yellow-400 focus:bg-yellow-400" 
            >
              Learn More
              <svg
                className="w-4 h-4 ml-2 -mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  description: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};

export default Section;
