import Section from '../components/Section.component';
import Footer from '../components/Footer.section';


const HomePage = () => {
  return (
    <div className="bg-white font-sans">
      <div className="pt-10 mt-10 ">
      <Section
        id="explore"
        title="Explore"
        images={[
          { src: "assets/Explore1.jpg", alt: "First Image" },
          { src: "assets/a-photo-capturing-the-audience-and-dj-booth-at-the-lab-episode-7-party-in-addis-ababa.jpg", alt: "Second Image" },
          { src: "assets/Explore.hanoi-quan-outdoor-seating.jpg", alt: "Third Image" },
        ]}
        description="Discover new places"
        heading="Explore Your World"
        linkTo="/explore"
      />

        <Section
          id="events"
          title="Events"
          images={[
            { src: "assets/Events.image.png", alt: "First Image" },
            { src: "assets/Event2.image.jpg", alt: "Second Image" },
            { src: "assets/Event3.image.jpg", alt: "Third Image" },
          ]}
          description="Upcoming Events and Scheduling"
          heading="Stay Updated with Events"
          linkTo="/events"
        />
        <Section
          id="places"
          title="Places"
          images={[
            { src: "assets/places1.jpg", alt: "First Image" },
            { src: "assets/place2.jpg", alt: "Second Image" },
            { src: "assets/place3.jpg", alt: "Third Image" },
          ]}
          description="Search, Filters, and Maps"
          heading="Find Your Favorite Spots"
          linkTo="/places"
        />
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
