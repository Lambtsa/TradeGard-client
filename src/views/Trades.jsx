import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { getMatches } from '../modules/api-service';

const Trades = () => {
  const { authState } = useOktaAuth();

  useEffect(() => {
    const { accessToken } = authState.accessToken;
    getMatches(accessToken).then(() => console.log('matches'));
  }, []);

  return <p>This is the trades page!!!!</p>;
};

export default Trades;
