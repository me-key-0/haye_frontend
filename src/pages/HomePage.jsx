import Section from '../components/Section.component';
import Footer from '../components/Footer.section';
import { fetchAllPlacesRequest } from '../redux/Slices/placesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const HomePage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAllPlacesRequest());
  }, [dispatch]);

  const places = useSelector((state) => state.places.allPlaces);

  // Filter places based on categories for different sections
  const explorePlaces = places.filter((place) => place.category === 'Restaurant');
  const eventPlaces = places.filter((place) => place.category === 'Cafe');
  const popularPlaces = places.filter((place) => place.category === 'Bar');

  return (
    <div className="bg-white font-sans">
      <div className="pt-10 mt-10">
        {/* Explore Section */}
        {explorePlaces.length > 0 && (
          <Section
            id="explore"
            title="Explore"
            images={explorePlaces.slice(0, 10).map((place) => ({
              src: place.image, 
              alt: place.name
            }))}
            description="Discover new places"
            heading="Explore Your World"
            linkTo="/explore"
          />
        )}

        {/* Events Section */}
        {eventPlaces.length > 0 && (
          <Section
            id="events"
            title="Events"
            images={eventPlaces.slice(0, 3).map((place) => ({
              src: place.image, 
              alt: place.name
            }))}
            description="Upcoming Events and Scheduling"
            heading="Stay Updated with Events"
            linkTo="/events"
          />
        )}

        {/* Popular Places Section */}
        {popularPlaces.length > 0 && (
          <Section
            id="places"
            title="Popular Places"
            images={popularPlaces.slice(0, 3).map((place) => ({
              src: place.image, 
              alt: place.name
            }))}
            description="Search, Filters, and Maps"
            heading="Find Your Favorite Spots"
            linkTo="/places"
          />
        )}

        {/* About Us Section */}
        <div id="about">
          <Section
            id="about"
            title="About Us"
            images={[
              { src: "assets/Haye_light.png", alt: "Our Mission" },
              { src: "assets/Haye_dark.png", alt: "Our Team" },
              { src: "assets/Haye_light.png", alt: "Our Vision" },
            ]}
            description="Haye Places is your go-to app for discovering and exploring the best restaurants, cafes, bars, and events around you. We strive to enhance your dining experience by providing detailed information, user reviews, and personalized recommendations."
            heading="Discover Haye Places"
            linkTo="/contact"
          />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
