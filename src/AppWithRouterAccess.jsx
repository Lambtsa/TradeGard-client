import React from 'react';
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
/* eslint-disable */
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

import Header from './components/Header/Header';
import SignIn from './components/SignIn/SignIn';
import Footer from './components/Footer/Footer';

import Home from './views/Home';
import MyAccount from './views/MyAccount';
import NewItem from './views/NewItem';
import SignUp from './views/SignUp';
import ItemDetails from './views/ItemDetails';
import UserItems from './views/UserItems';
import NotFound from './views/NotFound';
import Trades from './views/Trades';
import Likes from './views/Likes';

function AppWithRouterAccess() {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const oktaAuth = new OktaAuth({
    issuer: 'https://dev-39514775.okta.com/oauth2/default',
    clientId: '0oafd70h4dDX1fzm95d6',
    redirectUri: '/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: false,
  });

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={onAuthRequired}>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" render={() => <SignIn />} />
          <Route exact path="/login/callback" component={LoginCallback} />
          <SecureRoute exact path="/my-account" component={MyAccount} />
          <SecureRoute exact path="/new-item" component={NewItem} />
          <SecureRoute exact path="/trades" component={Trades} />
          <SecureRoute exact path="/likes" component={Likes} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/items/:id" component={ItemDetails} />
          <Route exact path="/users/:userId" component={UserItems} />
          <Route path="/" component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </Security>
  );
}

export default AppWithRouterAccess;
