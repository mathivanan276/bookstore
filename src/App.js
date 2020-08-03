import React, { Component } from 'react';

import Navigation from './containers/Navigation/Navigation';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

class App extends Component{
  state = {
    role : 'admin'
  }

  render(){
    return(
      <div>
          <Navigation role={this.state.role} />
          <Route path = "/" component={Navigation} />
      </div>
    );
  }
}

export default App;
