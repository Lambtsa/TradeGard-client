import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { fetchAllItems } from '../modules/api-service';

import Loader from '../components/Loader/Loader';
import ItemList from '../components/ItemList/ItemList';
import SnackBar from '../components/SnackBar/SnackBar';

const Home = () => {
  const { authState } = useOktaAuth();
  const [items, setItems] = useState([]);
  const [noItemError, setnoItemError] = useState(false);
  const [error, setError] = useState(false);
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
      setError(true);
      setIsLoading(false);
    }
  }, [authState.isAuthenticated]);

  return (
    <section className="items__container">
      {error && <SnackBar type="error" message="There has been an error. Please try again." state={error} setState={setError} />}
      {noItemError && <p>Oops! There are no items at the moment</p>}
      {!error && items.length > 0 && (
        <ItemList items={items} userLikes={userLikes} />
      )}
      {isLoading && <Loader />}
    </section>
  );
};

export default Home;
