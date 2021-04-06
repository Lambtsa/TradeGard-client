import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight as rightArrow } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader/Loader';
import SnackBar from '../components/SnackBar/SnackBar';

const MyAcccount = () => {
  const { oktaAuth } = useOktaAuth();
  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    oktaAuth.token.getUserInfo()
      .then(data => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <section className="content__container">
      {isLoading && <Loader />}
      {error && <SnackBar state={error} setState={setError} type="error" message="There was an issue, please try again." />}
      {!isLoading && (
        <>
          <div className="user">
            <p className="user__circle">{`${user.given_name[0].toUpperCase() || ''}${user.family_name[0].toUpperCase() || ''}`}</p>
            <div className="user__details">
              <h2>{user.name}</h2>
              <p className="user__subtitle">{user.email}</p>
            </div>
          </div>
          <button className="account__container" type="button" onClick={() => console.log('clicked')}>
            <h2>My details</h2>
            <FontAwesomeIcon icon={rightArrow} className="icon__right-arrow" />
          </button>
          <button className="account__container" type="button" onClick={() => console.log('clicked')}>
            <h2>Help</h2>
            <FontAwesomeIcon icon={rightArrow} className="icon__right-arrow" />
          </button>
          <button className="account__container" type="button" onClick={() => console.log('clicked')}>
            <h2>About</h2>
            <FontAwesomeIcon icon={rightArrow} className="icon__right-arrow" />
          </button>
          <div className="btn__wrapper">
            <button type="button" className="secondary__btn" onClick={() => oktaAuth.signOut()}>Logout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default MyAcccount;
