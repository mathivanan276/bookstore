import React, { Component } from 'react';


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

class App extends Component{


  render(){
    return(
      <div>
          <Navigation/>
          <Switch>
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
            <Route path='/admin/orders/confirmed/:orderId' component={Confirmed} />
            <Route path='/admin/orders/shipping/:orderId' component={Confirmed} />
            <Route path='/admin/orders/shipped/:orderId' component={Confirmed} />
            <Route path='/admin/orders/cancelled/:orderId' component={Confirmed} />
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
