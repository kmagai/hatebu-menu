import fetch from 'isomorphic-fetch';
import Shell from 'shell';
import _ from 'lodash';
import URL from 'url';
import {
  SELECT_CATEGORY, INVALIDATE_CATEGORY,
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

export function invalidateCategory(category) {
  return {
    type: INVALIDATE_CATEGORY,
    category
  };
}

function requestPosts(hatebu) {
  return {
    type: REQUEST_POSTS,
    hatebu
  };
}

function receivePosts(category, entries) {
  return {
    type: RECEIVE_POSTS,
    category: category,
    posts: entries,
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
      .then(json => {
        let entries = json.responseData.feed.entries;
        return Promise.all(
          _.map(entries, fetchStar)
        );
      })
      .then(merged_entries => {
        dispatch(receivePosts(category, merged_entries));
      })
  };
}

function fetchStar(entry) {
  return new Promise(function(resolve, reject){
    fetch(`http://api.b.st-hatena.com/entry.count?url=${entry['link']}`)
    .then(response => {
      if (response.status >= 400) {
        reject(new Error("Bad response from server"));
      }
      return response.json();
    })
    .then(star => {
      star != undefined ? resolve(Object.assign(entry, {'star': star})) : 0;
    })
  });
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
