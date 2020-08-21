import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as loginActionType from './store/actions/loginActions';

import Navigation from './containers/Navigation/Navigation';
import { Route, Switch } from 'react-router-dom';
import UserLogin from './containers/Login/UserLogin/UserLogin';
import UserRegister from './containers/register/UserRegister';
import Footer from './components/Footer/Footer';
import AddBook from './containers/Books/AddBook/AddBook';
import EditBook from './containers/Books/EditBook/EditBook';
import AdminHome from "./containers/Home/admin/AdminHome";
import AddBookCover from './containers/Books/AddBookCover/AddBookCover';
import ViewBook from './components/adminviewbook/Viewbook';
import AdminLogin from './containers/Login/AdminLogin/AdminLogin';
import BookControl from './containers/Books/BooksControlPanel';
import AuthorControlPanel from './containers/Authors/AuthorControlPanel';
import AddAuthor from './containers/Authors/AddAuthor/AddAuthor';
import EditAuthor from './containers/Authors/EditAuthor/EditAuthor';
import PublisherControlPanel from './containers/Publisher/PublisherControlPanel';
import AddPublisher from './containers/Publisher/AddPublisher/AddPublisher';
import EditPublisher from './containers/Publisher/EditPublisher/EditPublisher';
import GenreControlPanel from './containers/Genres/GenreControlPanel';
import AddGenre from './containers/Genres/AddGenre/AddGenre';
import EditGenre from './containers/Genres/EditGenre/EditGenre';
import Stock from './containers/Books/AddStock/Stock';
import Stocks from './containers/stocks/Stocks';
import Confirmed from './components/orderspage/confirmed/Confirmed';
import Shipping from './components/orderspage/shipping/Shipping';
import Shipped from './components/orderspage/shipped/Shipped';
import Cancelled from './components/orderspage/cancelled/Cancelled';

import Home from './containers/Home/user/Home';
import Profile from './containers/profile/Profile';

class App extends Component{

  componentDidMount(){
    this.props.checkLogged()
  }

  render(){
    return(
      <div>
          <Navigation/>
          <Switch>
            {/* Admin Routes */}
            <Route path='/login' component={UserLogin} />
            <Route path='/admin/login' component={AdminLogin} />
            <Route path='/register' component={UserRegister} />
            <Route path='/admin/stocks' component={Stocks} />
            <Route path='/admin/genre/add' component={AddGenre} />
            <Route path='/admin/genre/edit/:genreIndex' component={EditGenre} />
            <Route path='/admin/genre' component={GenreControlPanel} />
            <Route path='/admin/publisher/add' component={AddPublisher} />
            <Route path='/admin/publisher/edit/:publisherIndex' component={EditPublisher} />
            <Route path='/admin/publisher' component={PublisherControlPanel} />
            <Route path='/admin/author/add' component={AddAuthor} />
            <Route path='/admin/author/edit/:authorIndex' component={EditAuthor} />
            <Route path='/admin/author' component={AuthorControlPanel} />
            <Route path='/admin/book/cover/:bookId' component={AddBookCover} />
            <Route path='/admin/book/stock/:bookId/:quantity' component={Stock} />
            <Route path='/admin/book/edit/:bookId' component={EditBook} />
            <Route path='/admin/book/view/:bookId' component={ViewBook} />
            <Route path='/admin/book/add' component={AddBook} />
            <Route path='/admin/book' component={BookControl} />
            <Route path='/admin/orders/confirmed/:cartId/:orderId' component={Confirmed} />
            <Route path='/admin/orders/shipping/:cartId/:orderId' component={Shipping} />
            <Route path='/admin/orders/shipped/:cartId/:orderId' component={Shipped} />
            <Route path='/admin/orders/cancelled/:cartId/:orderId' component={Cancelled} />
            <Route path='/admin/home' component={AdminHome} />

            {/* User Routes */}
            <Route path='/categories' component={()=><h1>This is Categories page</h1>} />
            <Route path='/address' component={()=><h1>This is address page</h1>} />
            <Route path='/profile' component={Profile} />
            <Route path='/orders' component={()=><h1>This is orders page</h1>} />
            <Route path='/cart' component={()=><h1>This is Cart page</h1>} />
            <Route path='/new-arivals' component={Home} />
            <Route path='/home' component={Home} />
            <Route path='/' component={ () => {
              return <h1>404 - Page Not Found</h1>
            }} />
          </Switch>
          <Footer/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    checkLogged : () => dispatch(loginActionType.checkLoggedIn())
  }
}

export default connect(null,mapDispatchToProps)(App);
