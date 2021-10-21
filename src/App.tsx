import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from './context/auth';
import Home from './pages/home/Home';
import NoMatch from './pages/NoMatch';

function App() {
  const [auth, setAuth] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AuthContext.Provider value={{ auth, setAuth, open, setOpen }}>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
