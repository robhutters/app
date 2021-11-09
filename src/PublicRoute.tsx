import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/Auth';

const PublicRoute = ({ component: Component, ...rest }: any) => {
  const { user, restricted } = useAuth();

  // you can set Restriction levels with the setRestriction call present on the AuthContext object
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} render={(props) => 
      (
      user && restricted ? 
        <Redirect to='/dashboard' /> 
        : // false? then ...
        <Component {...props} />
    )} />
  );
};

export default PublicRoute;
