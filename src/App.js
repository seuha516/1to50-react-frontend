import React from 'react';
import { Route, Switch } from 'react-router-dom';
//components
import Home from './components/Home';
import Ranking from './components/Ranking';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ranking" exact component={Ranking} />
        <Route
          render={({ location }) => (
            <div style={{ color: 'white' }}>
              <h2>Not Found</h2>
              <br />
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </>
  );
};

export default App;
