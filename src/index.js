import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// imported from developer
import { BrowserRouter } from 'react-router-dom';
import {createStore, compose, applyMiddleware , combineReducers} from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import thunk from 'redux-thunk';

import LoginReducer from './store/reducers/loginReducer'; 
import AuthorReducer from './store/reducers/authorReducer'; 
import PublisherReducer from './store/reducers/publicherReducer';
import GenreReducer from './store/reducers/genreReducer';
import BookReducer from './store/reducers/bookReducer';
import OrderReducer from './store/reducers/orderReducer';
import OrderSummaryReducer from './store/reducers/orderSummaryReducer';
import PersonalInfoReducer from './store/reducers/personalInfoReducer';
import AddressReducer from './store/reducers/addressReducer';
import UserOrderReducer from './store/reducers/userOrderReducer';
import CartReducer from './store/reducers/cartReducer';

// axios.defaults.baseURL = 'http://localhost:80/bookstore_mvc';
axios.defaults.baseURL = 'https://b44cff2a67a1.ngrok.io/bookstore_mvc';

const rootReducer = combineReducers(
  {
    loginReducer : LoginReducer,
    authorReducer : AuthorReducer,
    publisherReducer : PublisherReducer,
    genreReducer : GenreReducer,
    bookReducer : BookReducer,
    orderReducer : OrderReducer,
    orderSummaryReducer : OrderSummaryReducer,
    personalInfoReducer : PersonalInfoReducer,
    addressReducer : AddressReducer,
    userOrderReducer : UserOrderReducer,
    cartReducer : CartReducer
  }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk))); 

ReactDOM.render(
  
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
