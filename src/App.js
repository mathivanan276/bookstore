import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Navigation from './containers/Navigation/Navigation';
import Home from './containers/Home/Home';

class App extends Component{
  state = {
    role : 'admin'
  }

  render(){
    return(
      <div>
          <Navigation role={this.state.role} />
          <Route path = "/ads" component={Home} />
      </div>
    );
  }
}

export default App;
