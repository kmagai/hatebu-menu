import { combineReducers } from 'redux';
import {
  SELECT_CATEGORY, INVALIDATE_HATEBU,
  REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_STARS
} from '../constants/ActionTypes';

function selectedCategory(state = 'ALL', action) {
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
  case INVALIDATE_HATEBU:
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
  case RECEIVE_STARS:
    console.log(JSON.stringify(action.stars));
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.stars,
    });
  default:
    return state;
  }
}

function postsByHatebu(state = { }, action) {
  switch (action.type) {
  case INVALIDATE_HATEBU:
  case RECEIVE_POSTS:
  case RECEIVE_STARS:
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
