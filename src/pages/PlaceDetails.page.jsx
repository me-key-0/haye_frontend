import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { fetchPlaceByIdRequest } from '../redux/Slices/placesSlice';

const PlaceDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const place = useSelector((state) => state.place.place);
  const loading = useSelector((state) => state.place.loading);
  const error = useSelector((state) => state.place.error);

  useEffect(() => {
    dispatch(fetchPlaceByIdRequest(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!place) return <div>No place found.</div>;

  const { name, description, rating, images = [] } = place;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p className="mb-4">{description}</p>
      <div className="mb-4">
        <strong>Rating:</strong> {rating}
      </div>
      {images.length > 0 && (
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          containerClass="container"
          dotListClass="dot-list"
          draggable
          focusOnSelect={false}
          infinite
          itemClass="carousel-item"
          keyBoardControl
          minimumTouchDrag={80}
          showDots
          slidesToSlide={1}
          swipeable
        >
          {images.map((image, index) => (
            <div key={index} className="p-2">
              <img src={image.url} alt={image.description} className="w-full h-auto object-cover rounded-lg" />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default PlaceDetailsPage;
