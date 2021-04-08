import React, { useEffect, useState } from 'react';
import { getMatches } from '../modules/api-service';
import MatchCard from '../components/MatchCard/MatchCard';
import SnackBar from '../components/SnackBar/SnackBar';
import Loader from '../components/Loader/Loader';

const Trades = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { accessToken } = JSON.parse(localStorage['okta-token-storage']).accessToken;
    getMatches(accessToken)
      .then(response => response.json())
      .then(data => {
        setMatches(data);
        setIsLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <section className="content__container">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
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
        </>
      )}
    </section>
  );
};

export default Trades;
