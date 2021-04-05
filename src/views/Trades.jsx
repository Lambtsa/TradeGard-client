import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { getMatches } from '../modules/api-service';
import MatchCard from '../components/MatchCard/MatchCard';
import SnackBar from '../components/SnackBar/SnackBar';

const Trades = () => {
  const { authState } = useOktaAuth();
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const { accessToken } = authState.accessToken;
    getMatches(accessToken)
      .then(response => response.json())
      .then(data => setMatches(data))
      .catch(() => setError(true));
  }, []);

  return (
    <section className="trades__container">
      {matches.length > 0 && (
        <ul>
          {matches.map(match => <MatchCard key={match.userDisplayName} matchDetails={match} />)}
        </ul>
      )}
      {matches.length === 0 && (
        <p>
          {`You currently have no matches but please
           like more items to increase your chances of a match`}
        </p>
      )}
      {error && <SnackBar state={error} setState={setError} type="error" message="There was an issue, please try again" />}
    </section>
  );
};

export default Trades;
