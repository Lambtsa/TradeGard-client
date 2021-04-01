import React from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import SignInForm from '../SignInForm/SignInForm';

const SignIn = () => {
  const { authState } = useOktaAuth();

  if (authState.pending) {
    return <p>Loading...</p>;
  }

  return authState.isAuthenticated
    ? <Redirect to={{ pathname: '/' }} />
    : <SignInForm />;
};

export default SignIn;
