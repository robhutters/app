import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/Auth';

const PublicRoute = ({ component: Component, restricted, ...rest }: any) => {
  const isAuthenticated = useAuth();
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} render={(props) => (isAuthenticated && restricted ? <Redirect to='/dashboard' /> : <Component {...props} />)} />
  );
};

export default PublicRoute;
