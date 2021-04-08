import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import Loader from '../components/Loader/Loader';
import Expandable from '../components/Expandable/Expandable';
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
          <Expandable title="My details">
            <div>
              <h3 className="">Your name</h3>
              <p className="">{user.name}</p>
              <h3 className="">Your display name</h3>
              <p className="">{user.nickname}</p>
              <h3 className="">Your e-mail</h3>
              <p className="">{user.email}</p>
              <Link to={`/users/${user.sub}`}>See your items</Link>
            </div>
          </Expandable>
          <Expandable title="Help">
            <div>
              <p>
                {`If you are experiencing any technical
                issues or have any questions, please contact us at`}
              </p>
              <a href="mailto:hello@tradegard.com">hello@tradegard.com</a>
            </div>
          </Expandable>
          <Expandable title="About">
            <p className="expandable__justify">
              {`Welcome to the Three Musketeers' trading app.
              This is the application we built as a graduation project for the </SALT> Applied School of Technology. Our strong beliefs in responsible consumption and minimalism led us to create and application that would allow users to swap items by matching users that mutually liked each others items.`}
            </p>
          </Expandable>
          <div className="btn__wrapper">
            <button type="button" className="secondary__btn" onClick={() => oktaAuth.signOut()}>Logout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default MyAcccount;
