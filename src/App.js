import React, { Component } from 'react';


import Navigation from './containers/Navigation/Navigation';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import UserLogin from './containers/Login/UserLogin/UserLogin';
import UserRegister from './containers/register/UserRegister';

class App extends Component{


  render(){
    return(
      <div>
          <Navigation/>
          <Switch>
            <Route path='/login' component={UserLogin} />
            <Route path='/register' component={UserRegister} />
            <Route path='/' exact component={()=>{ return <h1>home page</h1> } } />
            <Route path='/' component={ () => {
              return <h1>404 - Page Not Found</h1>
            }} />
          </Switch>
      </div>
    );
  }
}

export default App;
