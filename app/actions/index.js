import fetch from 'isomorphic-fetch';
import Shell from 'shell';
import {
  SELECT_CATEGORY, INVALIDATE_HATEBU,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../constants/ActionTypes';
import {URLS} from '../constants/Categories';
import {FEED_API} from '../constants/APIs';

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  };
}

export function invalidateHatebu(hatebu) {
  return {
    type: INVALIDATE_HATEBU,
    hatebu
  };
}

function requestPosts(hatebu) {
  return {
    type: REQUEST_POSTS,
    hatebu
  };
}

function receivePosts(category, json) {
  return {
    type: RECEIVE_POSTS,
    category: category,
    posts: json.responseData.feed.entries,
    receivedAt: Date.now()
  };
}

function fetchPosts(category) {
  return dispatch => {
    dispatch(requestPosts(category));
    let SELECTED_API = URLS[category];
    let FEED_URL = `${FEED_API}${SELECTED_API}`;
    
    return fetch(FEED_URL)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(category, json)));
  };
}

function shouldFetchPosts(state, category) {
  const posts = state.postsByHatebu[category];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}

export function fetchPostsIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      return dispatch(fetchPosts(category));
    }
  };
}

export function openLink(url) {
  return (dispatch) => {
    Shell.openExternal(url)
    return;
  }
}
