
import { Component } from 'react';
import ExploreSection from '../components/ExploreSection.component';
import SearchBar from '../components/SearchBar.component';

class ExplorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingPlaces: [
        { id: 1, name: 'Place 1', image: 'https://via.placeholder.com/300x200', description: 'A popular place to visit.' },
        { id: 2, name: 'Place 2', image: 'https://via.placeholder.com/300x200', description: 'Known for its stunning views.' },
        { id: 3, name: 'Place 3', image: 'https://via.placeholder.com/300x200', description: 'A must-see attraction.' },
      ],
      bestDeals: [
        { id: 4, name: 'Place 4', image: 'https://via.placeholder.com/300x200', description: 'Offering the best discounts.' },
        { id: 5, name: 'Place 5', image: 'https://via.placeholder.com/300x200', description: 'Great value for money.' },
        { id: 6, name: 'Place 6', image: 'https://via.placeholder.com/300x200', description: 'Best deals in the area.' },
      ],
      topRatedPlaces: [
        { id: 7, name: 'Place 7', image: 'https://via.placeholder.com/300x200', description: 'Top rated by visitors.' },
        { id: 8, name: 'Place 8', image: 'https://via.placeholder.com/300x200', description: 'Highly recommended.' },
        { id: 9, name: 'Place 9', image: 'https://via.placeholder.com/300x200', description: 'A favorite among locals.' },
      ],
    };
  }

  render() {
    const { trendingPlaces, bestDeals, topRatedPlaces } = this.state;

    return (
      <div className="pt-20">
        <SearchBar />
        <ExploreSection title="Trending Places" items={trendingPlaces} />
        <ExploreSection title="Best Deals" items={bestDeals} />
        <ExploreSection title="Top Rated Places" items={topRatedPlaces} />
      </div>
    );
  }
}

export default ExplorePage;


/*// src/pages/ExplorePage.js
import React, { Component } from 'react';
import ExploreSection from '../components/ExploreSection';
import SearchBar from '../components/SearchBar.component';

class ExplorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingPlaces: [],
      bestDeals: [],
      topRatedPlaces: [],
    };
  }

  componentDidMount() {
    this.fetchPlacesData();
  }

  fetchPlacesData = async () => {
    try {
      // Fetch places data from the backend API
      const response = await fetch('/api/places'); // replace with your actual API endpoint
      const placesData = await response.json();

      // Assuming the response has a list of all places with their details
      this.setState({
        trendingPlaces: this.getTrendingPlaces(placesData),
        bestDeals: this.getBestDeals(placesData),
        topRatedPlaces: this.getTopRatedPlaces(placesData),
      });
    } catch (error) {
      console.error('Error fetching places data:', error);
    }
  };

  getTrendingPlaces = (placesData) => {
    // Filter places based on the most recently registered date
    const sortedByDate = placesData.sort((a, b) => new Date(b.registerDate) - new Date(a.registerDate));
    return sortedByDate.slice(0, 5); // Take the top 5 most recent places
  };

  getBestDeals = (placesData) => {
    // Filter places based on deals with the highest percentage off
    return placesData
      .filter(place => place.deals && place.deals.length > 0)
      .map(place => ({
        ...place,
        bestDeal: place.deals.reduce((prev, current) => (prev.percentageOff > current.percentageOff ? prev : current))
      }))
      .sort((a, b) => b.bestDeal.percentageOff - a.bestDeal.percentageOff)
      .slice(0, 5); // Take the top 5 places with the best deals
  };

  getTopRatedPlaces = (placesData) => {
    // Filter places based on average ratings
    return placesData
      .filter(place => place.averageRating && place.averageRating > 4)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5); // Take the top 5 places with the highest ratings
  };

  render() {
    const { trendingPlaces, bestDeals, topRatedPlaces } = this.state;

    return (
      <div className="pt-20">
        <SearchBar />
        <ExploreSection title="Trending Places" items={trendingPlaces} />
        <ExploreSection title="Best Deals" items={bestDeals} />
        <ExploreSection title="Top Rated Places" items={topRatedPlaces} />
      </div>
    );
  }
}

export default ExplorePage;
*/
