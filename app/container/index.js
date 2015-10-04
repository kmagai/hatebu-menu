import React from 'react'
import App from './App'
import { Provider } from 'react-redux';
// import configureStore from '../stores/configureStore';

// const store = configureStore();
// console.log(store);

import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index.js'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

let logger = createLogger();
let store = applyMiddleware(thunk, logger)(createStore)(rootReducer);


React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('container')
)
