import React from 'react'
import CategoryTab from './category_tab.js'

// introducing redux
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import 'todomvc-app-css/index.css';

let logger = createLogger()
let store  = applyMiddleware(thunk, logger)(createStore)(rootReducer)
const store = configureStore();

React.render(
  <Provider store={store}>
    {() => <CategoryTab />}
  </Provider>,
  document.getElementById('container')
)
