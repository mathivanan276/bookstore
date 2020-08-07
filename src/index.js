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

axios.defaults.baseURL = 'https://8ba6a01d800c.ngrok.io/bookstore_mvc';

const rootReducer = combineReducers(
  {
    loginReducer : LoginReducer,
    authorReducer : AuthorReducer,
    publisherReducer : PublisherReducer
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
