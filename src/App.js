import React, { Component } from 'react';


import Navigation from './containers/Navigation/Navigation';
import { Route, Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import UserLogin from './containers/Login/UserLogin/UserLogin';
import UserRegister from './containers/register/UserRegister';
import Footer from './components/Footer/Footer';
import AddBook from './containers/Books/AddBook/AddBook';
import EditBook from './containers/Books/EditBook/EditBook';
import AdminHome from "./containers/Home/admin/AdminHome";
import AddBookCover from './containers/Books/AddBookCover/AddBookCover';
import ViewBook from './components/adminviewbook/Viewbook';

class App extends Component{


  render(){
    return(
      <div>
          <Navigation/>
          <Switch>
            <Route path='/login' component={UserLogin} />
            <Route path='/register' component={UserRegister} />
            <Route path='/admin/book/add' component={AddBook} />
            <Route path='/admin/book/cover/:bookId' component={AddBookCover} />
            <Route path='/admin/book/edit/:bookId' component={EditBook} />
            <Route path='/admin/book/view/:bookId' component={ViewBook} />
            <Route path='/admin/home' component={AdminHome} />
            <Route path='/home' component={()=>{ return <h1>home page</h1> } } />
            {/* <Route path="*" component={() =>{ return <h1>home page</h1>}} /> */}
            <Route path='/' component={ () => {
              return <h1>404 - Page Not Found</h1>
            }} />
          </Switch>
          <Footer/>
      </div>
    );
  }
}

export default App;
