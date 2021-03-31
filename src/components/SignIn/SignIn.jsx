import React from 'react';
import { Redirect } from 'react-router-dom';
import './SignIn.scss';
import { useOktaAuth } from '@okta/okta-react';
import SignInForm from '../SignInForm/SignInForm';

const SignIn = () => {
  const { authState } = useOktaAuth();

  console.log(authState);

  if (authState.pending) {
    return <p>Loading...</p>;
  }

  return authState.isAuthenticated
    ? <Redirect to={{ pathname: '/' }} />
    : <SignInForm />;
};

export default SignIn;
