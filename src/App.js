import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import * as loginActionType from "./store/actions/loginActions";
import Spinner from "./components/UI/spinner/Spinner";
import Navigation from "./containers/Navigation/Navigation";
import { Route, Switch } from "react-router-dom";
import UserLogin from "./containers/Login/UserLogin/UserLogin";
import UserRegister from "./containers/register/UserRegister";
import Footer from "./components/Footer/Footer";
import AdminLogin from "./containers/Login/AdminLogin/AdminLogin";
import NotFound from "./components/pagenotfound/NotFound";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const AddBook = lazy(() => import("./containers/Books/AddBook/AddBook"));
const EditBook = lazy(() => import("./containers/Books/EditBook/EditBook"));
const AdminHome = lazy(() => import("./containers/Home/admin/AdminHome"));
const AddBookCover = lazy(() =>
  import("./containers/Books/AddBookCover/AddBookCover")
);
const ViewBook = lazy(() => import("./components/adminviewbook/Viewbook"));
const BookControl = lazy(() => import("./containers/Books/BookControl"));
const AuthorControl = lazy(() => import("./containers/Authors/AuthorControl"));
const AddAuthor = lazy(() =>
  import("./containers/Authors/AddAuthor/AddAuthor")
);
const EditAuthor = lazy(() =>
  import("./containers/Authors/EditAuthor/EditAuthor")
);
const PublisherControl = lazy(() =>
  import("./containers/Publisher/PublisherControl")
);
const AddPublisher = lazy(() =>
  import("./containers/Publisher/AddPublisher/AddPublisher")
);
const EditPublisher = lazy(() =>
  import("./containers/Publisher/EditPublisher/EditPublisher")
);
const GenreControl = lazy(() => import("./containers/Genres/GenreControl"));
const AddGenre = lazy(() => import("./containers/Genres/AddGenre/AddGenre"));
const EditGenre = lazy(() => import("./containers/Genres/EditGenre/EditGenre"));
const Stock = lazy(() => import("./containers/Books/AddStock/Stock"));
const Stocks = lazy(() => import("./containers/stocks/Stocks"));
const Cancelled = lazy(() =>
  import("./components/orderspage/cancelled/Cancelled")
);
const Shipped = lazy(() => import("./components/orderspage/shipped/Shipped"));
const Confirmed = lazy(() =>
  import("./components/orderspage/confirmed/Confirmed")
);
const Shipping = lazy(() =>
  import("./components/orderspage/shipping/Shipping")
);

const Home = lazy(() => import("./containers/Home/user/Home"));
const Profile = lazy(() => import("./containers/profile/Profile"));
const EditAddress = lazy(() => import("./containers/address/edit/EditAddress"));
const AddAddress = lazy(() => import("./containers/address/add/AddAddress"));
const Userorders = lazy(() => import("./containers/userorders/Userorders"));
const Cancelorder = lazy(() =>
  import("./containers/userorders/cancelorder/Cancelorder")
);
const Vieworder = lazy(() =>
  import("./containers/userorders/vieworder/Vieworder")
);
const Cart = lazy(() => import("./containers/cart/Cart"));
const Placeorder = lazy(() => import("./containers/buybook/Placeorder"));
const View = lazy(() => import("./containers/viewbook/View"));
const Category = lazy(() => import("./containers/category/Category"));
const Search = lazy(() => import("./containers/search/Search"));

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
          <React.Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/admin/stocks" component={Stocks} />
              <Route path="/admin/genre/add" component={AddGenre} />
              <Route path="/admin/genre/edit/:genreId" component={EditGenre} />
              <Route path="/admin/genre" exact component={GenreControl} />
              <Route path="/admin/publisher/add" component={AddPublisher} />
              <Route
                path="/admin/publisher/edit/:publisherId"
                component={EditPublisher}
              />
              <Route
                path="/admin/publisher"
                exact
                component={PublisherControl}
              />
              <Route path="/admin/author/add" component={AddAuthor} />
              <Route
                path="/admin/author/edit/:authorId"
                component={EditAuthor}
              />
              <Route path="/admin/author" exact component={AuthorControl} />
              <Route
                path="/admin/book/cover/:bookId"
                component={AddBookCover}
              />
              <Route
                path="/admin/book/stock/:bookId/:quantity"
                component={Stock}
              />
              <Route path="/admin/book/edit/:bookId" component={EditBook} />
              <Route path="/admin/book/view/:bookId" component={ViewBook} />
              <Route path="/admin/book/add" component={AddBook} />
              <Route path="/admin/book" exact component={BookControl} />
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
              <Route path="/admin/home" exact component={AdminHome} />
              {/* User Routes */}
              <Route path="/categories" component={Category} />
              <Route path="/address/edit/:addressId" component={EditAddress} />
              <Route path="/address/add" component={AddAddress} />
              <Route path="/profile" component={Profile} />
              <Route
                path="/orders/cancelorder/:cartId"
                component={Cancelorder}
              />
              <Route path="/orders/vieworder/:cartId" component={Vieworder} />
              <Route path="/orders" exact component={Userorders} />
              <Route path="/buy" exact component={Placeorder} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/view/:bookId" component={View} />
              <Route path="/search/:searchKey" component={Search} />
              <Route path="/home" exact component={Home} />
              <Route path="/" exact component={Home} />
              <Route path="/" component={()=> <Redirect to='/' />} />
            </Switch>
          </React.Suspense>
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
