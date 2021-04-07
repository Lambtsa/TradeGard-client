import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { fetchAllItems } from '../modules/api-service';

import Loader from '../components/Loader/Loader';
import ItemList from '../components/ItemList/ItemList';

const Home = () => {
  const { authState } = useOktaAuth();
  const [items, setItems] = useState([]);
  const [noItemError, setnoItemError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [userLikes, setUserLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    let accessToken;
    if (authState.isAuthenticated) {
      accessToken = authState.accessToken.accessToken;
    }
    const response = await fetchAllItems(accessToken);
    if (response.ok) {
      const fetchedData = await response.json();
      if (fetchedData.items.length === 0) {
        setnoItemError(true);
        setIsLoading(false);
      }
      setItems(fetchedData.items);
      setUserLikes(fetchedData.userLikedItems);
      setIsLoading(false);
    } else {
      setFetchError(true);
      setIsLoading(false);
    }
  }, [authState.isAuthenticated]);

  return (
    <section className="items__container">
      {fetchError && <p>Items could not be fetched</p>}
      {noItemError && <p>Oops! There are no items at the moment</p>}
      {!fetchError && items.length > 0 && (
        <ItemList items={items} userLikes={userLikes} />
      )}
      {isLoading && <Loader />}
    </section>
  );
};

export default Home;
