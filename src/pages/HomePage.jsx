import Section from '../components/Section.component';
import Footer from '../components/Footer.section';


const HomePage = () => {
  return (
    <div className="bg-white font-sans">
      <div className="pt-20 mt-16">
      <Section
        id="explore"
        title="Explore"
        images={[
          { src: "../assets/Explore.20230811_153846.jpg", alt: "First Image" },
          { src: "image2.jpg", alt: "Second Image" },
          { src: "image3.jpg", alt: "Third Image" },
        ]}
        description="Discover new places"
        heading="Explore Your World"
        linkTo="/explore"
      />

        <Section
          id="events"
          title="Events"
          images={[
            { src: "image1.jpg", alt: "First Image" },
            { src: "image2.jpg", alt: "Second Image" },
            { src: "image3.jpg", alt: "Third Image" },
          ]}
          description="Upcoming Events and Scheduling"
          heading="Stay Updated with Events"
          linkTo="/events"
        />
        <Section
          id="places"
          title="Places"
          images={[
            { src: "image1.jpg", alt: "First Image" },
            { src: "image2.jpg", alt: "Second Image" },
            { src: "image3.jpg", alt: "Third Image" },
          ]}
          description="Search, Filters, and Maps"
          heading="Find Your Favorite Spots"
          linkTo="/places"
        />
        <Section
  id="about"
  title="About Us"
  images={[
    { src: "about-image1.jpg", alt: "Our Mission" },
    { src: "about-image2.jpg", alt: "Our Team" },
    { src: "about-image3.jpg", alt: "Our Vision" },
  ]}
  description="Haye Places is your go-to app for discovering and exploring the best restaurants, cafes, bars, and events around you. We strive to enhance your dining experience by providing detailed information, user reviews, and personalized recommendations."
  heading="Discover Haye Places"
  linkTo="/about"
/>

        <Footer />
        
      </div>

      
    </div>
  );
};

export default HomePage;
