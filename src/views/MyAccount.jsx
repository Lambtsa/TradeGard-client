import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

const MyAcccount = () => {
  const { oktaAuth } = useOktaAuth();

  return (
    <section className="form__container">
      <p>Some secret, protected stuff</p>
      <button type="button" className="secondary__btn" onClick={() => oktaAuth.signOut()}>Logout</button>
    </section>
  );
};

export default MyAcccount;
