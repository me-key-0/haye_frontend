import ESection from '../components/ESection.component';
import SearchBar from '../components/SearchBar.component';
import { fetchAllPlacesRequest } from '../redux/Slices/placesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { places as psst } from '../services/places.data'

const ExplorePage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAllPlacesRequest());
  }, [dispatch]);

  const places = useSelector((state) => state.places.allPlaces);
  const pl  = psst.filter((p)=>p.name)
  // Filter places based on categories for different sections
  const trendingPlaces = places.filter((place) => place.category === 'Restaurant');
  const bestDeals = places.filter((place) => place.category === 'Cafe');
  const topRatedPlaces = places.filter((place) => place.category === 'Bar');

    return (
      <div className="pt-20">
        <SearchBar type="explore" places={pl}/>
        
        <ESection title="Trending Places" items={trendingPlaces}  type="place"/>
        <ESection title="Best Deals" items={bestDeals}  type="place"/>
        <ESection title="Top Rated Places" items={topRatedPlaces} type="place"/>
      </div>
    );
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
