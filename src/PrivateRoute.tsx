import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/Auth';

function PrivateRoute({ component: Component, ...rest }: any) {
  const isAuthenticated = useAuth();

  return <Route {...rest} render={(props) => (isAuthenticated.session ? <Component {...props} /> : <Redirect to='/login' />)} />;
}

export default PrivateRoute;
