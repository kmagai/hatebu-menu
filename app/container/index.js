import React from 'react'
import App from './App'
import { Provider } from 'react-redux';
import configureStore from '../stores/configureStore';

const store = configureStore();

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('container')
)
