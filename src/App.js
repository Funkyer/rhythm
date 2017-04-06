import React, { Component } from 'react';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import AppRoute from './routes/App';
const history = createBrowserHistory();

class App extends Component {
  render(){
    return (
      <Router history={history}>
        <AppRoute />
      </Router>
    );
  }
}
export default App;
