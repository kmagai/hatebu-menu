import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

export default function configureStore(initialState) {
  console.log("=========dasdsadas======================");
  console.log(rootReducer);
  console.log("=========dasdsadas======================");
  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
