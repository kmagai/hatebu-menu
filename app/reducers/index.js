import { combineReducers } from 'redux';
import {
  SELECT_CATEGORY, INVALIDATE_CATEGORY,
  REQUEST_POSTS, RECEIVE_POSTS, SET_POLLING,
} from '../constants/ActionTypes';

function selectedCategory(state = 'GENERAL', action) {
  switch (action.type) {
  case SELECT_CATEGORY:
    return action.category;
  default:
    return state;
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case INVALIDATE_CATEGORY:
    return Object.assign({}, state, {
      didInvalidate: true
    });
  case REQUEST_POSTS:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case RECEIVE_POSTS:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.posts,
    });
  default:
    return state;
  }
}

function postsByHatebu(state = { }, action) {
  switch (action.type) {
  case INVALIDATE_CATEGORY:
  case RECEIVE_POSTS:
  case REQUEST_POSTS:
    return Object.assign({}, state, {
      [action.category]: posts(state[action.hatebu], action)
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  postsByHatebu,
  selectedCategory
});

export default rootReducer;
