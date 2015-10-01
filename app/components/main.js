import React from 'react'
import WeatherBox from './weather_box.js'

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
    {() => <WeatherBox />}
  </Provider>,
  document.getElementById('container')
)
