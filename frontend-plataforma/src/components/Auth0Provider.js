import { Auth0Provider } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

const AuthProvider = ({ children }) => {
  const domain = 'Tdev-4odrn6nq7733oisu.us.auth0.com';
  const clientId = 'TmIYhkmhnDFmae4HxMByfmwcM367JFHaE';
  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
