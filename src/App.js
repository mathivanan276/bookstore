import React, { Component } from 'react';

import Navigation from './containers/Navigation/Navigation';

class App extends Component{
  state = {
    role : 'admin'
  }

  render(){
    return(
      <div>
          <Navigation role={this.state.role} />
      </div>
    );
  }
}

export default App;
