import React from 'react';
import { Route, Switch } from 'react-router-dom';
import login from './pages/login';
import search from './pages/search';
import album from './pages/album';
import favorites from './pages/favorites';
import profile from './pages/profile';
import profileEdit from './pages/profileEdit';
import notFound from './pages/notFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/search" component={ search } />
          <Route path="/album/:id" component={ album } />
          <Route path="/favorites" component={ favorites } />
          <Route path="/profile/edit" component={ profileEdit } />
          <Route path="/profile" component={ profile } />
          <Route exact path="/" component={ login } />
          <Route path="*" component={ notFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
