import React, { Component } from 'react';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

const rootRoute = {
  childRoutes: [
    {
      path: '/',
      component: require('./components/App'),
      childRoutes: []
    }
  ]
};

class App extends Component {
  render(){
    return (
      <Router
        routes={rootRoute}
        history={history}
      />
    );
  }
}
export default App;
