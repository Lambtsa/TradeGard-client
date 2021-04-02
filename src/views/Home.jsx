import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { fetchAllItems } from '../modules/api-service';

import ItemCard from '../components/ItemCard/ItemCard';

const Home = () => {
  const { authState } = useOktaAuth();
  const [items, setItems] = useState([]);
  const [noItemError, setnoItemError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(async () => {
    let accessToken;
    console.log(authState.isAuthenticated, 'auth status');
    if (authState.isAuthenticated) {
      accessToken = authState.accessToken.accessToken;
      console.log(accessToken);
    }
    const response = await fetchAllItems(accessToken);
    if (response.ok) {
      const fetchedData = await response.json();
      console.log(fetchedData);
      if (fetchedData.items.length === 0) {
        setnoItemError(true);
      }
      setItems(fetchedData.items);
      setUserLikes(fetchedData.userLikedItems);
    } else {
      setFetchError(true);
    }
  }, [authState.isAuthenticated]);

  const checkIfLiked = id => {
    const liked = userLikes.includes(id);
    console.log(liked);
    return liked;
  };

  return (
    <section>
      {fetchError && <p>Items could not be fetched</p>}
      {noItemError && <p>Oops! There are no items at the moment</p>}
      {!fetchError && items.length > 0 && (
        <ul className="home__items-container">
          {items.map(item => (
            <ItemCard key={item._id} item={item} likedOnRender={() => checkIfLiked(item._id)} />
          ))}
        </ul>
      )}
      {!fetchError && !noItemError && items.length === 0
      && <p>Loading...</p>}
    </section>
  );
};

export default Home;
