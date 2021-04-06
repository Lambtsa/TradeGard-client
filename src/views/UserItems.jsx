import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { fetchAllItemsByUserId } from '../modules/api-service';

import Loader from '../components/Loader/Loader';
import SnackBar from '../components/SnackBar/SnackBar';
import ItemList from '../components/ItemList/ItemList';

const UserItems = () => {
  const { userId } = useParams();
  const { authState } = useOktaAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(async () => {
    let accessToken;
    if (authState.isAuthenticated) {
      accessToken = authState.accessToken.accessToken;
    }
    const response = await fetchAllItemsByUserId(userId, accessToken);
    if (!response.ok) {
      setError(true);
    } else {
      const data = await response.json();
      setItems(data.items);
      setUserLikes(data.userLikedItems);
      setError(false);
      setIsLoading(false);
    }
  }, [authState.isAuthenticated]);

  return (
    <section className="items__container">
      {isLoading && <Loader />}
      {error && <SnackBar state={error} setState={setError} type="error" message="Cannot load items. Please try again" />}
      {items.length > 0 && (
        <ItemList items={items} userLikes={userLikes} />
      )}
      {!isLoading && items.length === 0 && <p>This user has not currently posted any items</p>}
    </section>
  );
};

export default UserItems;
