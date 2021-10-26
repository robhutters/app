import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import NoMatch from './pages/NoMatch';

import { Signup } from './pages/signup/Signup';
import { Login } from './pages/login/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import Account from './pages/account/Account';
import { AuthProvider } from './context/Auth';
import { PrivateRoute } from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <PublicRoute exact path='/' component={Home} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/account' component={Account} />

            <Route component={NoMatch} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
