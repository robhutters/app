import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/Auth';

const PublicRoute = ({ component: Component, ...rest }: any) => {
  const { user, restricted } = useAuth();
  console.log(restricted);
  console.log(user);
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} render={(props) => (user && restricted ? <Redirect to='/dashboard' /> : <Component {...props} />)} />
  );
};

export default PublicRoute;
