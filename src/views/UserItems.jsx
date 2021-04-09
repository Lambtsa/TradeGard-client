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
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    items: [],
    userLikedItems: [],
    ownerDisplayName: '',
  });

  useEffect(async () => {
    let accessToken;
    if (authState.isAuthenticated) {
      accessToken = authState.accessToken.accessToken;
    }
    const response = await fetchAllItemsByUserId(userId, accessToken);
    if (!response.ok) {
      setError(true);
    } else {
      const responseData = await response.json();
      setData(responseData);
      setError(false);
      setIsLoading(false);
    }
  }, [authState.isAuthenticated]);

  return (
    <section className="items__container">
      {isLoading && <Loader />}
      {error && <SnackBar state={error} setState={setError} type="error" message="Cannot load items. Please try again" />}
      {data.items.length > 0 && (
        <ItemList
          items={data.items}
          userLikes={data.userLikedItems}
          caption={data.ownerDisplayName} />
      )}
      {!isLoading && data.items.length === 0 && <p>This user has not currently posted any items</p>}
    </section>
  );
};

export default UserItems;
