import { createStore } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  createLogger
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
