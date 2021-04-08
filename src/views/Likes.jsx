import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { fetchLikedItems } from '../modules/api-service';

import SnackBar from '../components/SnackBar/SnackBar';
import ItemList from '../components/ItemList/ItemList';
import Loader from '../components/Loader/Loader';

const Likes = () => {
  const { oktaAuth } = useOktaAuth();
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const details = await oktaAuth.token.getUserInfo();
    const id = details.sub;
    let accessToken;
    if (localStorage['okta-token-storage']) {
      accessToken = JSON.parse(localStorage['okta-token-storage']).accessToken.accessToken;
    }
    const response = await fetchLikedItems(id, accessToken);
    if (!response.ok) {
      setError(true);
    } else {
      const responseData = await response.json();
      setData(responseData);
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <SnackBar state={error} setState={setError} type="error" message="There was an error. Please try again" />}
      {data && data.items.length > 0 && (
        <ItemList items={data.items} userLikes={data.userLikedItems} caption="your likes" />
      )}
      {data && data.items.length === 0 && <p>You have not liked any items yet.</p>}
    </>
  );
};

export default Likes;
