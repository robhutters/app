import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import NoMatch from './pages/NoMatch';

import { Signup } from './pages/signup/Signup';
import { Login } from './pages/login/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Account } from './pages/account/Account';
import  {AuthProvider}  from './context/Auth';
import { DataProvider } from './context/Data';
import { PrivateRoute } from './PrivateRoute';
import { Favourites } from './pages/favourites/Favourites';
import './css/styles.css'

function App() {
  return (
    <>
      <AuthProvider>
        <DataProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/account' component={Account} />
            <PrivateRoute exact path='/favourites' component={Favourites} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
        </DataProvider>
       
      </AuthProvider>
    </>
  );
}

export default App;
