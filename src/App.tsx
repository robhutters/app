import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import NoMatch from './pages/NoMatch';

import Account from './pages/account/Account';

import { Signup } from './pages/signup/Signup';
import { Login } from './pages/login/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { AuthProvider } from './context/Auth';
import { PrivateRoute } from './PrivateRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />

            <Route component={NoMatch} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
