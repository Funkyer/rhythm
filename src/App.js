import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoute from './routes/App';

class App extends Component {
  render(){
    return (
      <Router>
        <AppRoute />
      </Router>
    );
  }
}
export default App;
