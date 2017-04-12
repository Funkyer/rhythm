import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import App from '../components/App';

class AppRoute extends Component{
  render(){
    return (
      <div>
        <Route path="/" component={App} />
      </div>
    );
  }
}

export default AppRoute;