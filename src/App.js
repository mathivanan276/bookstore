import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import * as loginActionType from "./store/actions/loginActions";

import Navigation from "./containers/Navigation/Navigation";
import { Route, Switch } from "react-router-dom";
import UserLogin from "./containers/Login/UserLogin/UserLogin";
import UserRegister from "./containers/register/UserRegister";
import Footer from "./components/Footer/Footer";
import AddBook from "./containers/Books/AddBook/AddBook";
import EditBook from "./containers/Books/EditBook/EditBook";
import AdminHome from "./containers/Home/admin/AdminHome";
import AddBookCover from "./containers/Books/AddBookCover/AddBookCover";
import ViewBook from "./components/adminviewbook/Viewbook";
import AdminLogin from "./containers/Login/AdminLogin/AdminLogin";
import BookControl from "./containers/Books/BookControl";
import AuthorControl from "./containers/Authors/AuthorControl";
import AddAuthor from "./containers/Authors/AddAuthor/AddAuthor";
import EditAuthor from "./containers/Authors/EditAuthor/EditAuthor";
import PublisherControl from "./containers/Publisher/PublisherControl";
import AddPublisher from "./containers/Publisher/AddPublisher/AddPublisher";
import EditPublisher from "./containers/Publisher/EditPublisher/EditPublisher";
import GenreControl from "./containers/Genres/GenreControl";
import AddGenre from "./containers/Genres/AddGenre/AddGenre";
import EditGenre from "./containers/Genres/EditGenre/EditGenre";
import Stock from "./containers/Books/AddStock/Stock";
import Stocks from "./containers/stocks/Stocks";
import Confirmed from "./components/orderspage/confirmed/Confirmed";
import Shipping from "./components/orderspage/shipping/Shipping";
import Shipped from "./components/orderspage/shipped/Shipped";
import Cancelled from "./components/orderspage/cancelled/Cancelled";

// import Home from './containers/Home/user/Home';
// import Profile from "./containers/profile/Profile";
// import EditAddress from "./containers/address/edit/EditAddress";
// import AddAddress from "./containers/address/add/AddAddress";
// import Userorders from "./containers/userorders/Userorders";
// import Cancelorder from "./containers/userorders/cancelorder/Cancelorder";
// import Vieworder from "./containers/userorders/vieworder/Vieworder";
// import Cart from "./containers/cart/Cart";
// import Placeorder from "./containers/buybook/Placeorder";
// import View from "./containers/viewbook/View";
// import Category from "./containers/category/Category";
// import Search from "./containers/search/Search";
import Spinner from "./components/UI/spinner/Spinner";

const Home = lazy(() => import("./containers/Home/user/Home"));
const Profile = lazy(() => import ("./containers/profile/Profile"));
const EditAddress = lazy( () => import("./containers/address/edit/EditAddress"));
const AddAddress = lazy( () => import("./containers/address/add/AddAddress"));
const Userorders = lazy( () => import("./containers/userorders/Userorders"));
const Cancelorder = lazy( () => import("./containers/userorders/cancelorder/Cancelorder"));
const Vieworder = lazy( () => import("./containers/userorders/vieworder/Vieworder"));
const Cart = lazy( () => import("./containers/cart/Cart"));
const Placeorder = lazy( () => import("./containers/buybook/Placeorder"));
const View = lazy( () => import("./containers/viewbook/View"));
const Category = lazy( () => import("./containers/category/Category"));
const Search = lazy( () => import("./containers/search/Search"));


class App extends Component {
  componentDidMount() {
    this.props.checkLogged();
  }

  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          {/* Admin Routes */}
          <Route path="/login" component={UserLogin} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/register" component={UserRegister} />
          <Route path="/admin/stocks" component={Stocks} />
          <Route path="/admin/genre/add" component={AddGenre} />
          <Route path="/admin/genre/edit/:genreId" component={EditGenre} />
          <Route path="/admin/genre" component={GenreControl} />
          <Route path="/admin/publisher/add" component={AddPublisher} />
          <Route
            path="/admin/publisher/edit/:publisherId"
            component={EditPublisher}
          />
          <Route path="/admin/publisher" component={PublisherControl} />
          <Route path="/admin/author/add" component={AddAuthor} />
          <Route path="/admin/author/edit/:authorId" component={EditAuthor} />
          <Route path="/admin/author" component={AuthorControl} />
          <Route path="/admin/book/cover/:bookId" component={AddBookCover} />
          <Route path="/admin/book/stock/:bookId/:quantity" component={Stock} />
          <Route path="/admin/book/edit/:bookId" component={EditBook} />
          <Route path="/admin/book/view/:bookId" component={ViewBook} />
          <Route path="/admin/book/add" component={AddBook} />
          <Route path="/admin/book" component={BookControl} />
          <Route
            path="/admin/orders/confirmed/:cartId/:orderId"
            component={Confirmed}
          />
          <Route
            path="/admin/orders/shipping/:cartId/:orderId"
            component={Shipping}
          />
          <Route
            path="/admin/orders/shipped/:cartId/:orderId"
            component={Shipped}
          />
          <Route
            path="/admin/orders/cancelled/:cartId/:orderId"
            component={Cancelled}
          />
          <Route path="/admin/home" component={AdminHome} />
          <React.Suspense fallback={<Spinner />}>
            {/* User Routes */}
            <Route path="/categories" component={Category} />
            <Route path="/address/edit/:addressId" component={EditAddress} />
            <Route path="/address/add" component={AddAddress} />
            <Route path="/profile" component={Profile} />
            <Route path="/orders/vieworder/:cartId" component={Vieworder} />
            <Route path="/orders/cancelorder/:cartId" component={Cancelorder} />
            <Route path="/orders" component={Userorders} />
            <Route path="/buy" component={Placeorder} />
            <Route path="/cart" component={Cart} />
            <Route path="/view/:bookId" component={View} />
            <Route path="/search/:searchKey" component={Search} />
            <Route path="/new-arivals" component={Home} />
            <Route path="/home" component={Home} />
          </React.Suspense>
          {/* <Route path='/home' component={Home} /> */}
          <Route
            path="/"
            component={() => {
              return <h1>404 - Page Not Found</h1>;
            }}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogged: () => dispatch(loginActionType.checkLoggedIn()),
  };
};

export default connect(null, mapDispatchToProps)(App);
