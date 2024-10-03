import Section from '../components/Section.component';
import Footer from '../components/Footer.section';
import { HomeRequest } from '../redux/Slices/placesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const HomePage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(HomeRequest());
  }, [dispatch]);

  const places = useSelector((state) => state.places.allPlaces || { explore: [], event: [], fav: '' });
  console.log(places)

  const explorePlaces = places.explore || [];
  const eventPlaces = places.event || [];
  const popularPlaces = places.explore || []; // Treat fav as an array if present

  return (
    <div className="bg-white font-sans">
      <div className="pt-10 mt-10">
        {/* Explore Section */}
        {explorePlaces.length > 0 && (
          <Section
            id="explore"
            title="Explore"
            images={explorePlaces.slice(0, 5).map((image) => ({
              src: image,
              alt: `Explore image ${image}`
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
            images={eventPlaces.slice(0, 5).map((image) => ({
              src: image,
              alt: `Event image ${image}`
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
            images={explorePlaces.slice(5, 10).map((image) => ({
              src: image,
              alt: `Explore image ${image}`
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
